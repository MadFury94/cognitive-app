import { NextRequest, NextResponse } from 'next/server';

// Basic input sanitiser
function sanitise(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str.trim().slice(0, 500);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const data = {
            parentName: sanitise(body.parentName),
            phone: sanitise(body.phone),
            email: sanitise(body.email),
            childName: sanitise(body.childName),
            childAge: sanitise(body.childAge),
            program: sanitise(body.program),
            preferredDate: sanitise(body.preferredDate),
            preferredTime: sanitise(body.preferredTime),
            message: sanitise(body.message),
        };

        // Validate required fields
        if (!data.parentName || !data.phone || !data.email || !data.childName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Forward to Cloudflare Worker
        const workerUrl = process.env.WORKER_URL;
        if (workerUrl) {
            await fetch(`${workerUrl}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        }

        // TODO: Send confirmation email via your email provider
        // e.g. Resend, SendGrid, Nodemailer

        return NextResponse.json({
            success: true,
            message: 'Booking received. We will contact you within 24 hours.',
        });

    } catch {
        return NextResponse.json(
            { error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}
