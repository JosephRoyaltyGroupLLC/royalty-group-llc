import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const { userId, email, returnUrl } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'User ID and Email are required' }, { status: 400 });
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe Price ID is not configured' }, { status: 500 });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}`,
      customer_email: email,
      client_reference_id: userId,
      subscription_data: {
        trial_period_days: 30,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
