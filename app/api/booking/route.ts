import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

// Basic input sanitiser — trims and length-caps
function sanitise(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str.trim().slice(0, 500);
}

// HTML-encode user values before interpolating into email HTML
function he(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

const VALID_PROGRAMS = ['dyslexia', 'adhd', 'autism', 'speech', 'dyspraxia', 'learning-delays', 'assessment'];
const VALID_AGES = ['3-5', '6-8', '9-12', '13-16', '17+'];
const VALID_TIMES = ['morning', 'afternoon', 'evening'];

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

        // Validate required fields (childName is optional — service forms may not collect it)
        if (!data.parentName || !data.phone || !data.email) {
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

        // Validate enum fields — reject values outside the expected sets
        if (data.program && !VALID_PROGRAMS.includes(data.program)) {
            return NextResponse.json({ error: 'Invalid program selection' }, { status: 400 });
        }
        if (data.childAge && !VALID_AGES.includes(data.childAge)) {
            return NextResponse.json({ error: 'Invalid age selection' }, { status: 400 });
        }
        if (data.preferredTime && !VALID_TIMES.includes(data.preferredTime)) {
            return NextResponse.json({ error: 'Invalid time selection' }, { status: 400 });
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

        // Send emails via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            const fromAddress = 'CogniSkills <bookings@cogniskillsleh.com>';
            const adminEmail = 'cogniskills@gmail.com';

            // 1. Notify the CogniSkills team of the new booking
            await resend.emails.send({
                from: fromAddress,
                to: adminEmail,
                subject: `New Booking Request — ${data.childName || 'Child'} (${data.program || 'General'})`,
                html: `
                    <h2>New Booking Request</h2>
                    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
                        <tr><td><strong>Parent Name</strong></td><td>${he(data.parentName)}</td></tr>
                        <tr><td><strong>Phone</strong></td><td>${he(data.phone)}</td></tr>
                        <tr><td><strong>Email</strong></td><td>${he(data.email)}</td></tr>
                        <tr><td><strong>Child's Name</strong></td><td>${he(data.childName || '—')}</td></tr>
                        <tr><td><strong>Child's Age</strong></td><td>${he(data.childAge || '—')}</td></tr>
                        <tr><td><strong>Program</strong></td><td>${he(data.program || '—')}</td></tr>
                        <tr><td><strong>Preferred Date</strong></td><td>${he(data.preferredDate || '—')}</td></tr>
                        <tr><td><strong>Preferred Time</strong></td><td>${he(data.preferredTime || '—')}</td></tr>
                        <tr><td><strong>Message</strong></td><td>${he(data.message || '—')}</td></tr>
                    </table>
                `,
            });

            // 2. Send a confirmation to the parent
            await resend.emails.send({
                from: fromAddress,
                to: data.email,
                subject: 'We received your booking request — CogniSkills',
                html: `
                    <p>Hi ${he(data.parentName)},</p>
                    <p>Thank you for reaching out to <strong>CogniSkills</strong>. We have received your booking request${data.childName ? ` for <strong>${he(data.childName)}</strong>` : ''} and will get back to you within 24 hours.</p>
                    <p>Here's a summary of what you submitted:</p>
                    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
                        <tr><td><strong>Child's Name</strong></td><td>${he(data.childName || '—')}</td></tr>
                        <tr><td><strong>Program</strong></td><td>${he(data.program || '—')}</td></tr>
                        <tr><td><strong>Preferred Date</strong></td><td>${he(data.preferredDate || '—')}</td></tr>
                        <tr><td><strong>Preferred Time</strong></td><td>${he(data.preferredTime || '—')}</td></tr>
                    </table>
                    <p>If you have any questions in the meantime, feel free to reply to this email or call us at <strong>0803 858 6878</strong>.</p>
                    <p>Warm regards,<br/>The CogniSkills Team</p>
                `,
            });
        }

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
