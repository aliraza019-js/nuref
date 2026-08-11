import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col items-center rounded-2xl border border-powder/60 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
    >
      <div
        className={`relative w-full ${compact ? "h-28" : "h-36"} transition-transform duration-300 group-hover:scale-105`}
        style={{ filter: "drop-shadow(0 10px 14px rgba(20,40,76,0.12))" }}
      >
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>

      <h3 className={`mt-6 font-bold text-navy ${compact ? "text-sm" : "text-base"}`}>
        {product.categoryLabel}
      </h3>

      {!compact && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/70">{product.shortDescription}</p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-bold text-black">{formatPrice(product.priceCents)}</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate">
          <BadgeCheck size={12} strokeWidth={2} />
          In Stock
        </span>
      </div>

      {/* Hover glow, matching the reference card's underglow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-2/5 -translate-x-1/2 translate-y-1 rounded-full bg-gold opacity-0 blur-md transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-60"
      />
    </Link>
  );
}
