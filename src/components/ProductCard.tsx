"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, CATEGORY_LABELS, type Product } from "@/lib/products";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-powder bg-white transition-shadow duration-300 hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-panel"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6"}`}>
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-bold uppercase leading-snug tracking-wide text-navy transition-opacity hover:opacity-70"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate">
          {CATEGORY_LABELS[product.category]}
        </p>

        <p className="mt-3 flex-1 text-xs leading-relaxed text-slate">{product.shortDescription}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-base font-bold text-navy">{formatPrice(product.priceCents)}</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-85"
            >
              Buy Now
            </button>
            <Link
              href={`/products/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-powder text-navy transition-colors hover:bg-ink hover:text-white"
            >
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
