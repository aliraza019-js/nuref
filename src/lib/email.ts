import { Resend } from "resend";

function client() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || "Nuref <onboarding@resend.dev>";
}

export async function sendSalesInquiry(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  const to = process.env.SALES_CONTACT_EMAIL;
  if (!to) throw new Error("SALES_CONTACT_EMAIL is not set");

  await client().emails.send({
    from: fromAddress(),
    to,
    replyTo: input.email,
    subject: `New sales inquiry from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.company ? `Company: ${input.company}` : null,
      "",
      input.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function sendOrderNotification(input: {
  orderId: number;
  customerName?: string | null;
  customerEmail: string;
  shippingAddress?: unknown;
  totalCents: number;
  currency: string;
  items: { name: string; quantity: number; priceCents: number }[];
}) {
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!to) throw new Error("ORDER_NOTIFICATION_EMAIL is not set");

  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: input.currency.toUpperCase(),
  }).format(input.totalCents / 100);

  const lines = input.items.map(
    (i) =>
      `- ${i.quantity} x ${i.name} (${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: input.currency.toUpperCase(),
      }).format(i.priceCents / 100)} each)`,
  );

  await client().emails.send({
    from: fromAddress(),
    to,
    subject: `New paid order #${input.orderId} — ${total}`,
    text: [
      `Order #${input.orderId}`,
      `Customer: ${input.customerName || "N/A"} <${input.customerEmail}>`,
      "",
      "Items:",
      ...lines,
      "",
      `Total: ${total}`,
      "",
      "Shipping address:",
      JSON.stringify(input.shippingAddress ?? {}, null, 2),
      "",
      "This order is drop-shipped — please forward to the fulfillment supplier.",
    ].join("\n"),
  });
}
