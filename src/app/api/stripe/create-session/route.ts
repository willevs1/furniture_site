import { NextResponse } from 'next/server';

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  if (!STRIPE_SECRET) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const body = await request.json();
  const { lineItems } = body; // expect [{price: 'price_...', quantity: 1}]

  // This is a minimal scaffold. To enable full Stripe Checkout:
  // - set STRIPE_SECRET_KEY in env
  // - uncomment the Stripe import and use stripe.checkout.sessions.create

  return NextResponse.json({ ok: true, message: 'Stripe scaffold: set STRIPE_SECRET_KEY to enable.' });
}
