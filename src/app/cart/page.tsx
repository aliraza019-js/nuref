"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore, cartTotalCents } from "@/store/useCartStore";
import { formatPrice } from "@/lib/products";
import OrderSummary from "@/components/OrderSummary";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const total = cartTotalCents(items);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-navy">Your cart</h1>
        <div className="rounded-2xl border border-powder bg-powder/15 py-20 text-center">
          <p className="text-lg font-bold text-navy">Your cart is empty</p>
          <p className="mt-2 text-sm text-black">Browse the catalogue to add reference electrodes and accessories.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-navy px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy"
          >
            Shop electrodes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-navy">Your cart</h1>

      <div className="grid gap-9 lg:grid-cols-[1.5fr_0.72fr]">
        <div className="overflow-hidden rounded-2xl border border-powder">
          {items.map((item) => (
            <div key={item.slug} className="grid grid-cols-[80px_1fr_auto] items-center gap-5 border-b border-powder p-5 last:border-b-0">
              <div className="relative h-20 w-20 rounded-lg bg-powder/20">
                <Image src={item.image} alt={item.name} fill className="object-contain p-2.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate">{item.sku}</div>
                <Link href={`/products/${item.slug}`} className="mt-1 block text-base font-bold leading-snug text-navy hover:text-gold">
                  {item.name}
                </Link>
                <div className="mt-2 flex items-center gap-3.5">
                  <div className="flex items-center rounded-lg border border-powder">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity - 1)}
                      className="h-8 w-8 text-sm text-navy"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-navy">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity + 1)}
                      className="h-8 w-8 text-sm text-navy"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="text-xs text-slate underline hover:text-navy"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold tracking-tight text-navy">
                  {formatPrice(item.priceCents * item.quantity)}
                </div>
                <div className="mt-0.5 text-xs text-slate">{formatPrice(item.priceCents)} each</div>
              </div>
            </div>
          ))}
        </div>

        <OrderSummary
          totalCents={total}
          ctaLabel="Secure checkout"
          onCtaClick={() => router.push("/checkout")}
          caption="Card payments processed securely"
        />
      </div>
    </main>
  );
}
