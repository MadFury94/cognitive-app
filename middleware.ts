import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// In-memory rate limiter (edge-compatible, resets on cold start)
// For production scale, replace with a KV or Cloudflare rate-limit rule.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
        return true; // allowed
    }

    if (entry.count >= limit) return false; // blocked

    entry.count += 1;
    return true;
}

// ---------------------------------------------------------------------------
// Allowed origins for cross-origin POST requests
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
    'https://cogniskillsleh.com',
    'https://www.cogniskillsleh.com',
    // Allow localhost in development
    'http://localhost:3001',
    'http://localhost:3000',
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

    // ------------------------------------------------------------------
    // 1. Admin route protection — require a valid session cookie
    //    Exempt: /admin/login (and its API route)
    // ------------------------------------------------------------------
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const sessionToken = request.cookies.get('admin_session')?.value;
        const envToken = process.env.ADMIN_TOKEN;

        if (!sessionToken || !envToken || sessionToken !== envToken) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ------------------------------------------------------------------
    // 2. Rate limiting on sensitive POST endpoints
    // ------------------------------------------------------------------
    if (request.method === 'POST') {
        if (pathname === '/api/admin/login') {
            // 10 attempts per 15 minutes per IP
            if (!rateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
                return NextResponse.json(
                    { error: 'Too many login attempts. Please try again later.' },
                    { status: 429 }
                );
            }
        }

        if (pathname === '/api/booking') {
            // 5 bookings per hour per IP
            if (!rateLimit(`booking:${ip}`, 5, 60 * 60 * 1000)) {
                return NextResponse.json(
                    { error: 'Too many requests. Please try again later.' },
                    { status: 429 }
                );
            }
        }
    }

    // ------------------------------------------------------------------
    // 3. CSRF — origin check on mutating API requests
    // ------------------------------------------------------------------
    if (
        request.method === 'POST' &&
        (pathname === '/api/booking' || pathname === '/api/admin/login')
    ) {
        const origin = request.headers.get('origin');
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        '/api/booking',
    ],
};
