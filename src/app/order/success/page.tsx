"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

function SuccessContent() {
  const clear = useCartStore((s) => s.clear);
  const searchParams = useSearchParams();

  // Present when returning from a 3D Secure / redirect-based payment
  // confirmation. The common path (no redirect required) never sends the
  // browser to this page with a redirect_status at all - handleSuccess()
  // on /checkout already cleared the cart in that case.
  const redirectStatus = searchParams.get("redirect_status");
  const status: "succeeded" | "processing" | "failed" =
    redirectStatus === "processing"
      ? "processing"
      : redirectStatus === "failed" || redirectStatus === "canceled"
        ? "failed"
        : "succeeded";

  useEffect(() => {
    if (status === "succeeded") clear();
  }, [status, clear]);

  if (status === "failed") {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">Payment Not Completed</h1>
        <p className="mt-4 text-base leading-relaxed text-black">
          Your payment could not be confirmed. You have not been charged. Please try again.
        </p>
        <Link
          href="/cart"
          className="mt-8 inline-block rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy"
        >
          Return to Cart
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-3xl bg-navy p-14 text-center">
        <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gold text-2xl font-extrabold text-navy">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">
          {status === "processing" ? "Payment Processing" : "Order Confirmed"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-powder">
          {status === "processing"
            ? "Your payment is still being confirmed - we'll email you once it clears."
            : "A confirmation has been sent to your email. Your order is now with our fulfilment partner and will ship direct to your delivery address."}
        </p>
        <Link
          href="/products"
          className="mt-7 inline-block rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-navy transition-opacity hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
