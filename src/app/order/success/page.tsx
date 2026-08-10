"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function OrderSuccessPage() {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-navy">Thank you for your order</h1>
      <p className="mt-4 text-base leading-relaxed text-black">
        Your payment was successful and your order confirmation has been sent to your email. Our
        team will process your order for shipping shortly.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
