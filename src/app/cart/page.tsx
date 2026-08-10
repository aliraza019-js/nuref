"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useCartStore, cartTotalCents } from "@/store/useCartStore";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [checkingOut, setCheckingOut] = useState(false);

  const total = cartTotalCents(items);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
      setCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-navy">Your Cart</h1>

      <div className="mt-8 divide-y divide-powder border-y border-powder">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 flex-shrink-0 rounded border border-powder bg-white">
              <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-black">{item.name}</p>
              <p className="mt-1 text-sm text-black">{formatPrice(item.priceCents)}</p>
            </div>
            <div className="flex items-center rounded-md border border-powder">
              <button
                type="button"
                onClick={() => setQuantity(item.slug, item.quantity - 1)}
                className="h-9 w-9 text-base font-semibold text-navy"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-black">{item.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.slug, item.quantity + 1)}
                className="h-9 w-9 text-base font-semibold text-navy"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              className="ml-2 text-xs font-semibold text-slate hover:text-navy"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-base font-bold text-black">Total</span>
        <span className="text-lg font-bold text-navy">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={checkingOut}
        className="mt-6 w-full rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {checkingOut ? "Redirecting to checkout..." : "Checkout"}
      </button>
    </main>
  );
}
