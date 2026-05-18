import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString, isValidEmail, isValidPhone } from '@/lib/validation';

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(ip);
  if (!record || now > record.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitizeString(body.name);
  const email = sanitizeString(body.email);
  const phone = sanitizeString(body.phone);
  const eventDate = sanitizeString(body.eventDate);
  const eventType = sanitizeString(body.eventType);
  const guestCount = sanitizeString(body.guestCount);
  const specialRequests = sanitizeString(body.specialRequests ?? '');

  if (!name || name.length < 2) return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: 'Invalid phone.' }, { status: 400 });
  if (!eventDate) return NextResponse.json({ error: 'Event date required.' }, { status: 400 });
  if (!eventType || eventType.length < 2) return NextResponse.json({ error: 'Event type required.' }, { status: 400 });
  const guests = parseInt(guestCount, 10);
  if (isNaN(guests) || guests < 1 || guests > 10000) return NextResponse.json({ error: 'Invalid guest count.' }, { status: 400 });

  /*
    PLACEHOLDER: Email sending via Nodemailer
    See /api/contact/route.ts for setup instructions.
    Uncomment and configure:

    await transporter.sendMail({
      from: `"Chef Daddy's Website" <${process.env.EMAIL_USER}>`,
      to: 'Chefdaddy933@gmail.com',
      replyTo: email,
      subject: `Catering Inquiry — ${eventType} on ${eventDate} (${guests} guests)`,
      text: `
        Catering Inquiry
        ----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Event Date: ${eventDate}
        Event Type: ${eventType}
        Guest Count: ${guests}
        Special Requests: ${specialRequests || 'None'}
      `,
      html: `
        <h2>New Catering Inquiry</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Event Date:</strong></td><td>${eventDate}</td></tr>
          <tr><td><strong>Event Type:</strong></td><td>${eventType}</td></tr>
          <tr><td><strong>Guest Count:</strong></td><td>${guests}</td></tr>
        </table>
        <p><strong>Special Requests:</strong></p>
        <p style="white-space: pre-wrap;">${specialRequests || 'None'}</p>
      `,
    });
  */

  console.log('[Catering Form]', { name, email, phone, eventDate, eventType, guests });

  return NextResponse.json({ ok: true });
}
