"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { getAllProducts, formatPrice } from "@/lib/products";

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.categoryLabel)))],
    [products],
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.categoryLabel === active);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Products</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-black">
        Reference electrodes and corrosion monitoring solutions for cathodic protection systems.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              active === cat
                ? "border-navy bg-navy text-white"
                : "border-powder text-black hover:border-navy"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-powder transition-colors hover:border-navy"
          >
            <div className="relative aspect-square w-full bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8 transition-transform group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-navy shadow-sm ring-1 ring-powder">
                <BadgeCheck size={12} strokeWidth={2} />
                In Stock
              </span>
            </div>
            <div className="border-t border-powder p-5">
              <h2 className="text-sm font-bold text-navy">{product.name}</h2>
              <p className="mt-2 text-sm text-black">{product.shortDescription}</p>
              <p className="mt-4 text-base font-bold text-black">{formatPrice(product.priceCents)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
