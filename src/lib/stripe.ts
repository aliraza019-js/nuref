import Stripe from "stripe";

function createStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

export const stripe = globalForStripe.stripe ?? createStripe();

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe;
