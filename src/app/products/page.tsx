"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const CATEGORY_ORDER: ProductCategory[] = ["ag-agcl", "cu-cuso4", "zinc", "mmo-ti", "accessories"];

function isProductCategory(value: string | null): value is ProductCategory {
  return !!value && (CATEGORY_ORDER as string[]).includes(value);
}

function ProductsContent() {
  const products = getAllProducts();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [active, setActive] = useState<"All" | ProductCategory>(
    isProductCategory(initialCategory) ? initialCategory : "All",
  );

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Catalogue</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Products</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink">
        Reference electrodes and corrosion monitoring accessories for cathodic protection systems. All
        items ship direct; project quantities quoted on request.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("All")}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            active === "All" ? "border-ink bg-ink text-white" : "border-powder text-ink hover:border-ink"
          }`}
        >
          All
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              active === cat ? "border-ink bg-ink text-white" : "border-powder text-ink hover:border-ink"
            }`}
          >
            {CATEGORY_LABELS[cat]}
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

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
