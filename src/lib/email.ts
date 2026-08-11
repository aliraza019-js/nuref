import { Resend } from "resend";

function client() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || "Nuref <onboarding@resend.dev>";
}

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(
    cents / 100,
  );
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

interface OrderEmailInput {
  orderId: number;
  customerName?: string | null;
  customerEmail: string;
  shippingAddress?: unknown;
  totalCents: number;
  currency: string;
  items: { name: string; quantity: number; priceCents: number }[];
}

export async function sendOrderNotification(input: OrderEmailInput) {
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!to) throw new Error("ORDER_NOTIFICATION_EMAIL is not set");

  const lines = input.items.map(
    (i) => `- ${i.quantity} x ${i.name} (${formatMoney(i.priceCents, input.currency)} each)`,
  );

  await client().emails.send({
    from: fromAddress(),
    to,
    subject: `New paid order #${input.orderId} — ${formatMoney(input.totalCents, input.currency)}`,
    text: [
      `Order #${input.orderId}`,
      `Customer: ${input.customerName || "N/A"} <${input.customerEmail}>`,
      "",
      "Items:",
      ...lines,
      "",
      `Total: ${formatMoney(input.totalCents, input.currency)}`,
      "",
      "Shipping address:",
      JSON.stringify(input.shippingAddress ?? {}, null, 2),
      "",
      "This order is drop-shipped — please forward to the fulfillment supplier.",
    ].join("\n"),
  });
}

/** Receipt sent to the customer themselves, separate from the internal fulfillment notification. */
export async function sendOrderConfirmation(input: OrderEmailInput) {
  const lines = input.items.map(
    (i) => `- ${i.quantity} x ${i.name} (${formatMoney(i.priceCents, input.currency)} each)`,
  );

  await client().emails.send({
    from: fromAddress(),
    to: input.customerEmail,
    subject: `Your Nuref order #${input.orderId} is confirmed`,
    text: [
      `Hi ${input.customerName || "there"},`,
      "",
      `Thanks for your order — we've received your payment and your order is being prepared for shipment.`,
      "",
      `Order #${input.orderId}`,
      "",
      "Items:",
      ...lines,
      "",
      `Total: ${formatMoney(input.totalCents, input.currency)}`,
      "",
      "If you have any questions about your order, just reply to this email.",
      "",
      "— Nuref",
    ].join("\n"),
  });
}
