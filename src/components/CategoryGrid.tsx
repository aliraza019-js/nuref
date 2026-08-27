import Link from "next/link";
import { getAllProducts, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";

const CATEGORY_BLURB: Record<ProductCategory, string> = {
  "ag-agcl": "Marine, brackish, and freshwater reference electrodes.",
  "cu-cuso4": "The industry-standard half-cell for soil and buried pipeline CP.",
  zinc: "Durable references for embedded concrete and submerged service.",
  "mmo-ti": "Inert, long-life references for demanding CP monitoring.",
  accessories: "Terminal boards, calibration kits, and field accessories.",
};

const CATEGORY_ORDER: ProductCategory[] = ["ag-agcl", "cu-cuso4", "zinc", "mmo-ti", "accessories"];

export default function CategoryGrid() {
  const products = getAllProducts();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Shop by category</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Browse the Range</h2>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((cat, i) => {
            const count = products.filter((p) => p.category === cat).length;
            // Alternating tints give the grid a checkerboard rhythm.
            const tint = i % 2 === 0 ? "bg-panel" : "bg-white border border-border";
            // The fifth tile widens to fill the trailing gap in a 3-up grid.
            const wide = i === CATEGORY_ORDER.length - 1 ? "lg:col-span-2" : "";

            return (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className={`group flex min-h-[300px] flex-col justify-between rounded-3xl p-8 transition-colors hover:bg-border ${tint} ${wide}`}
              >
                <div>
                  <h3 className="max-w-[12ch] text-2xl font-semibold leading-snug tracking-tight text-navy">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-ink/70">
                    {CATEGORY_BLURB[cat]}
                  </p>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-navy underline decoration-navy/40 underline-offset-4 transition-colors group-hover:decoration-navy">
                    View products
                  </span>
                  <span className="text-xs text-slate">
                    {count} {count === 1 ? "item" : "items"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
