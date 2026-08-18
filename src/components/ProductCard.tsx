"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-powder bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className={`relative block ${compact ? "h-[200px]" : "h-[260px]"} bg-powder/20`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(58% 52% at 50% 40%, rgba(240,180,41,0.10), transparent 70%)" }}
        />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-contain ${compact ? "p-6" : "p-8"} transition-transform duration-300 group-hover:scale-105`}
        />
        <span className="absolute left-3 top-3 z-[2] rounded-full border border-powder bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-navy">
          {product.sku}
        </span>
        {!compact && (
          <span className="absolute right-3 top-3 z-[2] rounded-full bg-powder/40 px-2.5 py-1 text-[11px] font-semibold text-navy">
            In stock
          </span>
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <Link href={`/products/${product.slug}`} className={`font-bold leading-snug text-navy ${compact ? "text-sm" : "text-base"}`}>
          {product.name}
        </Link>

        {!compact && (
          <>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-black">{product.shortDescription}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.chips.map((chip) => (
                <span key={chip} className="rounded-md bg-powder/25 px-2 py-1 text-xs font-semibold text-navy">
                  {chip}
                </span>
              ))}
            </div>
          </>
        )}

        <div className={`flex items-center justify-between gap-3 ${compact ? "mt-3" : "mt-4"}`}>
          <span className={`font-extrabold tracking-tight text-navy ${compact ? "text-base" : "text-lg"}`}>
            {formatPrice(product.priceCents)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-navy px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-gold hover:text-navy"
          >
            {compact ? "Add" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
