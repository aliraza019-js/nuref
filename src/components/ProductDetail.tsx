"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Clock,
  FileCheck2,
  Crosshair,
  Lock,
  ShieldCheck,
  Truck,
  UserRound,
  Waves,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice, CATEGORY_LABELS, type Product } from "@/lib/products";
import { useCartStore } from "@/store/useCartStore";

const TABS = ["Description", "Specifications", "Downloads"] as const;
type Tab = (typeof TABS)[number];

/** Highlights are restatements of the product's own spec sheet — never invented claims. */
function buildHighlights(product: Product) {
  const spec = (label: string) => product.specs.find((s) => s.label === label)?.value;
  const out: { icon: React.ElementType; title: string; body: string }[] = [];

  const stability = spec("Stability");
  if (stability) out.push({ icon: Crosshair, title: "Measurement accuracy", body: `${stability}.` });

  const application = spec("Application");
  if (application) out.push({ icon: Waves, title: "Service environment", body: `Rated for ${application.toLowerCase()}.` });

  const life = spec("Design life");
  if (life) out.push({ icon: Clock, title: "Design life", body: `${life}.` });

  if (product.includes.some((i) => /installation/i.test(i)))
    out.push({ icon: Wrench, title: "Installation guidance", body: "Supplied with an installation guidance sheet." });

  return out.slice(0, 4);
}

const TRUST = [
  { icon: Lock, title: "Reliable", body: "Consistent performance in demanding conditions." },
  { icon: FileCheck2, title: "Certified", body: "Manufactured to international CP standards." },
  { icon: Truck, title: "Direct shipping", body: "Dispatched to your site or office in 3–5 days." },
  { icon: UserRound, title: "Expert support", body: "Our engineers help with selection and setup." },
];

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("Description");

  const highlights = buildHighlights(product);

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart`);
  };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-medium text-slate">
          <Link href="/" className="hover:text-navy">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-navy">Products</Link>
          <ChevronRight size={12} />
          <span className="uppercase text-navy">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Gallery. Thumbnails repeat the single supplied image until
              per-SKU photography is available. */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border bg-panel ${
                    i === 0 ? "border-ink" : "border-powder"
                  }`}
                >
                  <Image src={product.image} alt="" aria-hidden fill className="object-contain p-1.5" />
                </div>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-xl bg-panel">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-10"
                />
              </div>
            </div>
          </div>

          {/* Buy panel */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight text-navy sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-navy">{formatPrice(product.priceCents)}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">{product.shortDescription}</p>

            <div className="mt-7 space-y-5">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-panel text-navy">
                    <h.icon size={15} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-sm font-bold text-navy">{h.title}</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-slate">{h.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-powder">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-11 w-11 text-lg text-navy transition-colors hover:bg-panel"
                >
                  &minus;
                </button>
                <span className="w-10 text-center text-sm font-bold text-navy">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="h-11 w-11 text-lg text-navy transition-colors hover:bg-panel"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="h-11 flex-1 min-w-[180px] rounded-lg bg-ink px-8 text-sm font-bold text-white transition-opacity hover:opacity-85"
              >
                Add to Cart
              </button>
            </div>

            <Link
              href="/contact"
              className="mt-3 block rounded-lg border border-powder py-3 text-center text-sm font-semibold text-navy transition-colors hover:bg-panel"
            >
              Request a Quote
            </Link>

            <dl className="mt-7 space-y-1.5 text-xs text-slate">
              <div><span className="font-semibold text-navy">SKU:</span> {product.sku}</div>
              <div><span className="font-semibold text-navy">Category:</span> {CATEGORY_LABELS[product.category]}</div>
              <div><span className="font-semibold text-navy">Tags:</span> {product.chips.join(", ")}</div>
            </dl>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-t border-powder">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-8 border-b border-powder">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 py-4 text-sm transition-colors ${
                  tab === t
                    ? "border-ink font-bold text-navy"
                    : "border-transparent font-medium text-slate hover:text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-10">
            {tab === "Description" && (
              <p className="max-w-3xl text-sm leading-relaxed text-slate">{product.description}</p>
            )}

            {tab === "Specifications" && (
              <div className="max-w-3xl overflow-hidden rounded-xl border border-powder">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[0.85fr_1.15fr] border-b border-powder last:border-b-0">
                    <div className="bg-panel px-5 py-3 text-sm font-semibold text-navy">{spec.label}</div>
                    <div className="px-5 py-3 text-sm text-ink">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Downloads" && (
              <div className="max-w-3xl">
                <p className="text-sm leading-relaxed text-slate">
                  Datasheets, calibration certificates and declarations of conformity are issued per
                  order. Contact our team and we&rsquo;ll send the documentation pack for this model.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-lg bg-ink px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
                >
                  Request documentation
                </Link>
              </div>
            )}
          </div>

          {/* Trust row */}
          <div className="mb-16 grid gap-6 rounded-xl border border-powder p-7 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-panel text-navy">
                  <t.icon size={16} strokeWidth={2} />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy">{t.title}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-slate">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom solution band */}
      <section className="bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-8 px-6 py-14">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
            <ShieldCheck size={22} strokeWidth={1.9} />
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">Need a custom solution?</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-powder">
              We supply custom cable lengths, bulk quantities and full documentation packs for
              project work. Contact our team today.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-lg bg-white px-7 py-3 text-sm font-bold text-ink transition-opacity hover:opacity-90"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-lg font-bold text-navy">You may also need</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <RelatedCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-powder transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-panel">
        <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
      </div>
      <div className="p-5">
        <div className="text-sm font-bold uppercase leading-snug text-navy">{product.name}</div>
        <div className="mt-2 text-sm font-bold text-navy">{formatPrice(product.priceCents)}</div>
      </div>
    </Link>
  );
}
