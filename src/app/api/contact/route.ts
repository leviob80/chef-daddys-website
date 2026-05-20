import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString, isValidEmail, isValidPhone } from '@/lib/validation';

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

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

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  );
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  return ['https://www.chefdaddysbbq.com', 'https://chefdaddysbbq.com', 'http://localhost:3000'].includes(origin);
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot check
  if (body.honeypot) {
    return NextResponse.json({ ok: true }); // Silently succeed for bots
  }

  const name = sanitizeString(body.name);
  const email = sanitizeString(body.email);
  const phone = sanitizeString(body.phone ?? '');
  const subject = sanitizeString(body.subject);
  const message = sanitizeString(body.message);

  // Validate
  if (!name || name.length < 2) return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  if (phone && !isValidPhone(phone)) return NextResponse.json({ error: 'Invalid phone.' }, { status: 400 });
  if (!subject || subject.length < 2) return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
  if (!message || message.length < 10) return NextResponse.json({ error: 'Message too short.' }, { status: 400 });

  /*
    PLACEHOLDER: Email sending via Nodemailer
    To enable email delivery:
    1. npm install nodemailer
    2. Add to .env.local:
         EMAIL_HOST=smtp.gmail.com
         EMAIL_PORT=587
         EMAIL_USER=your-sending-email@gmail.com
         EMAIL_PASS=your-app-password  (Google: Settings → Security → App Passwords)
    3. Uncomment the block below:

    import nodemailer from 'nodemailer';

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Chef Daddy's Website" <${process.env.EMAIL_USER}>`,
      to: 'Chefdaddy933@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });
  */

  console.log('[Contact Form]', { name, email, phone, subject, messageLength: message.length });

  return NextResponse.json({ ok: true });
}
