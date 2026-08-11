"use client";

import { useMemo, useState } from "react";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

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

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
