"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore, cartTotalCents, cartItemCount } from "@/store/useCartStore";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const router = useRouter();
  const open = useCartStore((s) => s.drawerOpen);
  const close = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const total = cartTotalCents(items);
  const count = cartItemCount(items);

  // Close on Escape, and lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  const goCheckout = () => {
    close();
    router.push("/checkout");
  };

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={18} strokeWidth={2} className="text-ink" />
            <h2 className="text-base font-bold text-navy">
              Your cart {count > 0 && <span className="text-slate">({count})</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-panel hover:text-ink"
          >
            <X size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="text-base font-bold text-navy">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate">
              Browse the catalogue to add reference electrodes and accessories.
            </p>
            <Link
              href="/products"
              onClick={close}
              className="mt-6 rounded-full bg-ink px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
            >
              Shop electrodes
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={close}
                    className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-panel"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={close}
                      className="block text-sm font-bold uppercase leading-snug text-navy hover:opacity-70"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate">{formatPrice(item.priceCents)} each</p>

                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="h-8 w-8 text-sm text-ink transition-colors hover:bg-panel"
                        >
                          &minus;
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-navy">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="h-8 w-8 text-sm text-ink transition-colors hover:bg-panel"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="text-xs text-slate underline transition-colors hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-sm font-bold text-navy">
                    {formatPrice(item.priceCents * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-border px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-navy">Subtotal</span>
                <span className="text-xl font-extrabold text-navy">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs text-slate">Tax and freight calculated at checkout.</p>

              <button
                type="button"
                onClick={goCheckout}
                className="mt-4 w-full rounded-full bg-ink py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
              >
                Checkout
              </button>
              <Link
                href="/cart"
                onClick={close}
                className="mt-2.5 block rounded-full border border-border py-3 text-center text-sm font-semibold text-navy transition-colors hover:bg-panel"
              >
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
