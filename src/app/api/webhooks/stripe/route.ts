import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification, sendOrderConfirmation } from "@/lib/email";
import { getProductBySlug } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Already recorded (Stripe can retry webhook delivery) — skip.
    const existing = await prisma.order.findUnique({
      where: { stripePaymentIntentId: paymentIntent.id },
    });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    const meta = paymentIntent.metadata;
    let lineItems: { slug: string; quantity: number }[] = [];
    try {
      lineItems = JSON.parse(meta.items || "[]");
    } catch {
      console.error("Failed to parse PaymentIntent items metadata", paymentIntent.id);
    }

    const resolvedItems = lineItems
      .map((li) => {
        const product = getProductBySlug(li.slug);
        if (!product) return null;
        return { productSlug: li.slug, name: product.name, priceCents: product.priceCents, quantity: li.quantity };
      })
      .filter((i): i is NonNullable<typeof i> => i !== null);

    const shippingAddress = {
      name: meta.customerName,
      company: meta.customerCompany || undefined,
      address: meta.shippingAddress,
      city: meta.shippingCity,
      country: meta.shippingCountry,
    };

    const order = await prisma.order.create({
      data: {
        stripePaymentIntentId: paymentIntent.id,
        customerEmail: meta.customerEmail || "unknown@nuref.com",
        customerName: meta.customerName,
        shippingAddress,
        totalCents: paymentIntent.amount,
        currency: paymentIntent.currency,
        items: { create: resolvedItems },
      },
      include: { items: true },
    });

    const emailPayload = {
      orderId: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      shippingAddress: order.shippingAddress,
      totalCents: order.totalCents,
      currency: order.currency,
      items: order.items.map((i) => ({ name: i.name, quantity: i.quantity, priceCents: i.priceCents })),
    };

    // Order is already recorded even if either email fails - don't let a
    // Resend outage roll back or retry-loop a payment that already succeeded.
    try {
      await sendOrderNotification(emailPayload);
    } catch (err) {
      console.error("Failed to send order notification email", err);
    }
    try {
      await sendOrderConfirmation(emailPayload);
    } catch (err) {
      console.error("Failed to send order confirmation email", err);
    }
  }

  return NextResponse.json({ ok: true });
}
