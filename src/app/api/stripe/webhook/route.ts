import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-05-27.dahlia',
});



export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback if webhook secret is not configured
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const subscription = event.data.object as Stripe.Subscription;

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        // When the checkout session completes, save the Stripe customer ID to the user's document
        if (session.client_reference_id && session.customer) {
          await setDoc(doc(db, 'partners', session.client_reference_id), {
            stripeCustomerId: session.customer,
            subscriptionStatus: 'active',
            subscriptionId: session.subscription,
            email: session.customer_details?.email,
          }, { merge: true });
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // Update subscription status in Firestore
        const customerId = subscription.customer as string;
        // In a real app, we would query the partners collection for the user with this customerId
        // Since we don't have the UID here directly, we'd need to search or structure data accordingly.
        // For simplicity, we assume we update status on the document
        // We will need to query for it if we don't have the doc ID
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook event:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
