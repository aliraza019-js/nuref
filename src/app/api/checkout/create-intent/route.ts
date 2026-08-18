import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";

interface CustomerDetails {
  name: string;
  email: string;
  company?: string;
  address: string;
  city: string;
  country: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    items?: { slug: string; quantity: number }[];
    customer?: CustomerDetails;
  };
  const { items, customer } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }
  if (!customer?.name || !customer?.email || !customer?.address || !customer?.city || !customer?.country) {
    return NextResponse.json({ message: "Delivery details are incomplete" }, { status: 400 });
  }

  // Re-price every line server-side from the catalog — never trust prices
  // submitted by the client. Only slug + quantity go into PaymentIntent
  // metadata (Stripe metadata is size-limited); the webhook re-resolves
  // names/prices from the catalog by slug when it records the order.
  let totalCents = 0;
  const lineItems: { slug: string; quantity: number }[] = [];

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) {
      return NextResponse.json({ message: `Unknown product: ${item.slug}` }, { status: 400 });
    }
    const quantity = Math.max(1, Math.floor(item.quantity));
    totalCents += product.priceCents * quantity;
    lineItems.push({ slug: item.slug, quantity });
  }

  if (totalCents <= 0) {
    return NextResponse.json({ message: "Cart total must be greater than zero" }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCents,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    receipt_email: customer.email,
    metadata: {
      items: JSON.stringify(lineItems),
      customerName: customer.name,
      customerEmail: customer.email,
      customerCompany: customer.company || "",
      shippingAddress: customer.address,
      shippingCity: customer.city,
      shippingCountry: customer.country,
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, totalCents });
}
