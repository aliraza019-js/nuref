"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/products";

export default function OrderSummary({
  totalCents,
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
  caption,
  showBackToCart = false,
}: {
  totalCents: number;
  ctaLabel: string;
  onCtaClick: () => void;
  ctaDisabled?: boolean;
  caption?: string;
  showBackToCart?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-powder shadow-[0_30px_56px_-32px_rgba(20,40,76,0.28)] lg:sticky lg:top-28">
      <div className="bg-ink px-6 py-5">
        <span className="text-base font-bold text-white">Order summary</span>
      </div>
      <div className="p-6">
        <div className="flex justify-between py-2 text-sm text-ink">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPrice(totalCents)}</span>
        </div>
        <div className="flex justify-between py-2 text-sm text-ink">
          <span>Freight</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between py-2 text-sm text-ink">
          <span>Tax</span>
          <span>Applied at checkout</span>
        </div>
        <div className="my-3 h-px bg-powder" />
        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm font-bold text-navy">Total</span>
          <span className="text-2xl font-extrabold tracking-tight text-navy">{formatPrice(totalCents)}</span>
        </div>

        <button
          type="button"
          onClick={onCtaClick}
          disabled={ctaDisabled}
          className="w-full rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {ctaLabel}
        </button>

        {caption && <p className="mt-3 text-center text-xs text-slate">{caption}</p>}
        {showBackToCart && (
          <Link href="/cart" className="mt-3 block text-center text-xs font-medium text-slate hover:text-navy">
            Back to cart
          </Link>
        )}
      </div>
    </div>
  );
}
