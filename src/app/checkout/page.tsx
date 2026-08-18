"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { Appearance } from "@stripe/stripe-js";
import { getStripe } from "@/lib/stripeClient";
import { useCartStore, cartTotalCents } from "@/store/useCartStore";
import { formatPrice } from "@/lib/products";
import { useMounted } from "@/lib/useMounted";

interface CustomerForm {
  name: string;
  email: string;
  company: string;
  address: string;
  city: string;
  country: string;
}

const EMPTY_FORM: CustomerForm = { name: "", email: "", company: "", address: "", city: "", country: "" };

const appearance: Appearance = {
  variables: {
    colorPrimary: "#f0b429",
    colorBackground: "#14284c",
    colorText: "#ffffff",
    colorTextSecondary: "#b7c6dc",
    fontFamily: "Arial, Helvetica, sans-serif",
    borderRadius: "10px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": { border: "1px solid rgba(183,198,220,0.3)", backgroundColor: "rgba(183,198,220,0.1)" },
    ".Label": { color: "#b7c6dc", fontSize: "13px", fontWeight: "600" },
  },
};

function PaymentStep({ customer, onSuccess }: { customer: CustomerForm; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success`,
        payment_method_data: {
          billing_details: { name: customer.name, email: customer.email },
        },
      },
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message || "Payment failed. Please check your card details and try again.");
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  return (
    <div>
      <div className="rounded-2xl bg-navy p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-powder">Card details</span>
          <span className="text-[11px] font-bold tracking-wide text-gold">SECURE</span>
        </div>
        <PaymentElement />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handlePay}
        disabled={submitting || !stripe}
        className="mt-5 w-full rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-50"
      >
        {submitting ? "Processing…" : "Pay now"}
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = cartTotalCents(items);

  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ordered, setOrdered] = useState(false);

  // The cart store hydrates from localStorage after mount, so `items` is
  // always [] during the server render / first paint. Guard the
  // empty-cart redirect on mount to avoid both a false-positive redirect
  // for shoppers who do have a saved cart, and a `location`/`window`
  // reference crash during static prerendering.
  const mounted = useMounted();

  const formValid =
    form.name.trim() && form.email.trim() && form.address.trim() && form.city.trim() && form.country.trim();

  const handleContinue = async () => {
    if (!formValid) {
      setError("Please fill in your name, email, address, city and country.");
      return;
    }
    setError(null);
    setCreatingIntent(true);
    try {
      const res = await fetch("/api/checkout/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not start checkout");
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout");
    } finally {
      setCreatingIntent(false);
    }
  };

  const handleSuccess = () => {
    clear();
    setOrdered(true);
  };

  if (!mounted) return null;

  if (items.length === 0 && !ordered) {
    router.replace("/cart");
    return null;
  }

  if (ordered) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-3xl bg-navy p-14 text-center">
          <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gold text-2xl font-extrabold text-navy">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">Order confirmed</h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-powder">
            A confirmation has been sent to your email. Your order is now with our fulfilment partner
            and will ship direct to your delivery address.
          </p>
          <Link
            href="/products"
            className="mt-7 inline-block rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-navy transition-opacity hover:opacity-90"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-navy">Checkout</h1>

      <div className="grid gap-9 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-navy">Delivery details</p>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Full name" span2>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Okafor"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
            <Field label="Work email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
            <Field label="Company">
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company Ltd"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
            <Field label="Delivery address" span2>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Site or office address"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
            <Field label="City">
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
            <Field label="Country">
              <input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="Country"
                disabled={!!clientSecret}
                className="nr-checkout-input"
              />
            </Field>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <div className="mt-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-navy">Payment</p>
            {clientSecret ? (
              <Elements stripe={getStripe()} options={{ clientSecret, appearance }}>
                <PaymentStep customer={form} onSuccess={handleSuccess} />
              </Elements>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                disabled={creatingIntent}
                className="w-full rounded-xl bg-navy px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-50"
              >
                {creatingIntent ? "Preparing payment…" : "Continue to payment"}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-powder shadow-[0_30px_56px_-32px_rgba(20,40,76,0.28)] lg:sticky lg:top-28 lg:self-start">
          <div className="bg-navy px-6 py-5 text-base font-bold text-white">Order summary</div>
          <div className="p-6">
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between gap-4 py-2 text-sm text-black">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="whitespace-nowrap font-semibold">{formatPrice(item.priceCents * item.quantity)}</span>
              </div>
            ))}
            <div className="my-3 h-px bg-powder" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-navy">Total</span>
              <span className="text-2xl font-extrabold tracking-tight text-navy">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, span2, children }: { label: string; span2?: boolean; children: React.ReactNode }) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <div className="mb-1.5 text-xs font-semibold text-black">{label}</div>
      {children}
    </div>
  );
}
