import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Credentials checked server-side only — never exposed to the browser
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;
        const adminToken = process.env.ADMIN_TOKEN;

        if (!validUsername || !validPassword || !adminToken) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Constant-time-ish comparison via artificial delay on failure
        if (username !== validUsername || password !== validPassword) {
            await new Promise(r => setTimeout(r, 300));
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Set the token in an httpOnly, Secure, SameSite=Strict cookie.
        // The raw token value never reaches the browser JS context.
        const response = NextResponse.json({ success: true }, { status: 200 });

        response.cookies.set('admin_session', adminToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            // 8-hour session
            maxAge: 60 * 60 * 8,
        });

        return response;

    } catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
}

export async function DELETE() {
    // Logout — clear the session cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    });
    return response;
}
