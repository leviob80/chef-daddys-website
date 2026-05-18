import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString, isValidPhone } from '@/lib/validation';

interface OrderItem {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
}

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'CD-';
  for (let i = 0; i < 6; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
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

  const customer = body.customer as { name?: string; phone?: string; pickupTime?: string } | undefined;
  const items = body.items as OrderItem[] | undefined;

  if (!customer) return NextResponse.json({ error: 'Customer info required.' }, { status: 400 });

  const name = sanitizeString(customer.name ?? '');
  const phone = sanitizeString(customer.phone ?? '');
  const pickupTime = sanitizeString(customer.pickupTime ?? '');

  if (!name || name.length < 2) return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: 'Invalid phone.' }, { status: 400 });
  if (!pickupTime) return NextResponse.json({ error: 'Pickup time required.' }, { status: 400 });

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items in order.' }, { status: 400 });
  }

  // Validate item structure (never trust client-side prices)
  for (const item of items) {
    if (typeof item.id !== 'string' || typeof item.name !== 'string') {
      return NextResponse.json({ error: 'Invalid item data.' }, { status: 400 });
    }
    if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 50) {
      return NextResponse.json({ error: 'Invalid quantity.' }, { status: 400 });
    }
    /*
      IMPORTANT SECURITY NOTE:
      In production, item prices should be looked up from your server-side price database,
      NOT trusted from the client payload. Example:
        const serverItem = await db.menuItems.findById(item.id);
        if (!serverItem) return error;
        const trustedPrice = serverItem.priceCents;

      This prevents price manipulation attacks.
    */
  }

  const orderNumber = generateOrderNumber();

  /*
    PLACEHOLDER: Order processing pipeline
    In production, integrate one of the following:

    1. STRIPE (Recommended for online payment):
       - Create a PaymentIntent server-side and return client_secret
       - Client confirms payment with stripe.confirmCardPayment(clientSecret)
       - On webhook: stripe.webhooks.constructEvent → update order status

       API Key setup:
         STRIPE_SECRET_KEY=sk_live_... (in .env.local — never expose this)
         NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (safe for client)

    2. SQUARE:
       SQUARE_ACCESS_TOKEN=... (server-side only)
       NEXT_PUBLIC_SQUARE_APPLICATION_ID=... (client-safe)
       NEXT_PUBLIC_SQUARE_LOCATION_ID=... (client-safe)

    3. PAYPAL:
       PAYPAL_CLIENT_ID=... (server-side)
       PAYPAL_CLIENT_SECRET=... (server-side)

    4. DATABASE: Store the order in your database before confirming.
       Never store payment card data — route all payments through Stripe/Square/PayPal.

    Current behavior: Order is logged and confirmed without payment processing.
    This is appropriate for "pay at pickup" flow.
  */

  const itemsSummary = items.map((i) => `${i.name} ×${i.quantity}`).join(', ');
  console.log(`[Order ${orderNumber}]`, { name, phone, pickupTime, items: itemsSummary });

  /*
    PLACEHOLDER: Send order confirmation email/SMS
    Use Nodemailer (email) or Twilio (SMS) to notify both customer and restaurant.

    Restaurant notification email to Chefdaddy933@gmail.com:
    - Order number, customer name, phone, pickup time, items

    Customer confirmation SMS (Twilio):
    - "Your Chef Daddy's order #CD-XXXXXX is confirmed for pickup at [time]!"
  */

  return NextResponse.json({ ok: true, orderNumber });
}
