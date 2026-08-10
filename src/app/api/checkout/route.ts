import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";

export async function POST(request: NextRequest) {
  const { items } = (await request.json()) as { items?: { slug: string; quantity: number }[] };

  if (!items || items.length === 0) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  // Re-price every line server-side from the catalog — never trust prices
  // submitted by the client.
  const lineItems: Array<{
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; images: string[] };
    };
    quantity: number;
  }> = [];

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) {
      return NextResponse.json({ message: `Unknown product: ${item.slug}` }, { status: 400 });
    }
    const quantity = Math.max(1, Math.floor(item.quantity));
    lineItems.push({
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          images: product.image.startsWith("http") ? [product.image] : [],
        },
      },
      quantity,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AE", "SA"] },
    success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/order/cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
