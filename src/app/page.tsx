import Link from "next/link";
import { ArrowUpRight, Lock, ShieldCheck, Truck, Wrench } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import HeroProductVisual from "@/components/HeroProductVisual";
import ProductCard from "@/components/ProductCard";
import SelectionGuideTable from "@/components/SelectionGuideTable";

const STATS = [
  { value: "4", label: "Electrode families" },
  { value: "±5 mV", label: "Potential stability" },
  { value: "20 yr", label: "Design life" },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Meets international CP standards" },
  { icon: Lock, label: "Secure card checkout" },
  { icon: Truck, label: "Shipped direct to site" },
  { icon: Wrench, label: "Engineer-led product support" },
];

export default function Home() {
  const featured = getAllProducts().slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-powder">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 55% at 76% 34%, rgba(240,180,41,0.07), transparent 66%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50% 45% at 14% 16%, rgba(183,198,220,0.22), transparent 70%)" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 py-1.5 pl-2.5 pr-3.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-wide text-navy">
                Cathodic protection · In stock
              </span>
            </div>

            <h1 className="max-w-[15ch] text-5xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl lg:text-[74px]">
              Reference electrodes for critical infrastructure.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-black">
              Nuref designs, manufactures and supplies high-performance reference electrodes and
              corrosion monitoring hardware — engineered to international CP standards, built for the
              harshest industrial service.
            </p>

            <div className="mb-12 mt-9 flex flex-wrap gap-3.5">
              <Link
                href="/products"
                className="rounded-xl bg-gold px-8 py-4 text-base font-bold text-navy shadow-[0_18px_40px_-14px_rgba(240,180,41,0.35)] transition-colors hover:bg-navy hover:text-white"
              >
                Shop electrodes
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-powder px-8 py-4 text-base font-semibold text-navy transition-colors hover:border-black hover:bg-powder/20"
              >
                Request a quote
              </Link>
            </div>

            <div className="flex flex-wrap gap-11">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <HeroProductVisual className="mx-auto w-full max-w-[420px]" />
        </div>

        <div className="relative border-t border-powder">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon size={20} className="flex-shrink-0 text-navy" strokeWidth={1.75} />
                <span className="text-sm text-black">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The range */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">The range</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Nine electrode &amp; accessory models
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-lg border border-powder px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              View all products
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <SelectionGuideTable />

      {/* CTA */}
      <section className="border-t border-powder bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Specifying for a project?
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-black">
              Bulk quantities, custom cable lengths and full documentation packs are handled by our
              sales desk. Most enquiries are answered the same working day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 lg:justify-end">
            <Link
              href="/contact"
              className="rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Request a quote
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-powder px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-powder/20"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
