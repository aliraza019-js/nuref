import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification, sendOrderConfirmation } from "@/lib/email";

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

  if (event.type === "checkout.session.completed") {
    const sessionSummary = event.data.object as Stripe.Checkout.Session;

    // Already recorded (Stripe can retry webhook delivery) — skip.
    const existing = await prisma.order.findUnique({ where: { stripeSessionId: sessionSummary.id } });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionSummary.id, {
      expand: ["line_items"],
    });
    const lineItems = session.line_items?.data ?? [];

    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email || "unknown@nuref.com",
        customerName: session.customer_details?.name,
        shippingAddress: session.collected_information?.shipping_details
          ? JSON.parse(JSON.stringify(session.collected_information.shipping_details))
          : undefined,
        totalCents: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        items: {
          create: lineItems.map((li) => ({
            productSlug: li.description ?? "unknown",
            name: li.description ?? "Unknown item",
            priceCents: li.amount_total && li.quantity ? Math.round(li.amount_total / li.quantity) : 0,
            quantity: li.quantity ?? 1,
          })),
        },
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
