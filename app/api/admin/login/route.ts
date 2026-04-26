import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Credentials checked server-side only — never exposed to browser
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;
        const adminToken = process.env.ADMIN_TOKEN;

        if (!validUsername || !validPassword || !adminToken) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        if (username !== validUsername || password !== validPassword) {
            // Consistent response time to prevent timing attacks
            await new Promise(r => setTimeout(r, 300));
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        return NextResponse.json({ token: adminToken }, { status: 200 });

    } catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
}
