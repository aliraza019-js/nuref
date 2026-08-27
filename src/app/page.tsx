import Link from "next/link";
import { ArrowRight, MessageSquareQuote, Play } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import HeroProductVisual from "@/components/HeroProductVisual";
import ProductCard from "@/components/ProductCard";
import CategoryGrid from "@/components/CategoryGrid";
import SelectionGuideTable from "@/components/SelectionGuideTable";

export default function Home() {
  const allProducts = getAllProducts();

  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="nr-hero-bleed relative overflow-hidden bg-white">
        {/* Decorative sweep behind the left column */}
        <svg
          aria-hidden
          viewBox="0 0 400 200"
          className="pointer-events-none absolute bottom-6 left-0 h-28 w-[300px] text-white/50"
          fill="none"
        >
          <path
            d="M-20 30C60 10 120 70 150 120s90 70 150 40"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <div>
            <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl">
              Cathodic Protection Reference Electrodes
            </h1>

            <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-slate">
              Nuref designs, manufactures and supplies high-performance reference electrodes for
              monitoring cathodic protection on pipelines, marine structures and reinforced concrete.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/products"
                className="inline-flex h-12 items-center rounded-full bg-ink px-8 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
              >
                Explore Now
              </Link>

              <Link href="/contact" className="group inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-powder text-navy transition-colors group-hover:bg-ink group-hover:text-white">
                  <Play size={14} strokeWidth={2.5} className="ml-0.5" />
                </span>
                <span className="text-sm font-semibold text-navy">How To Buy</span>
              </Link>
            </div>

            <div className="mt-10 flex max-w-md items-start gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-panel text-navy">
                <MessageSquareQuote size={16} strokeWidth={2} />
              </span>
              <p className="text-xs leading-relaxed text-slate">
                Selection depends on the electrolyte your structure sits in and how long the
                electrode must stay in service — our engineers confirm against your survey data.
              </p>
            </div>
          </div>

          <HeroProductVisual
            src="/products/nuref-electrode.png"
            className="mx-auto w-full max-w-[560px]"
          />
        </div>
      </section>

      {/* ── Selection prompt band ──────────────────────────────────────── */}
      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink">
          <div className="grid gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                Selection help
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                Not sure which electrode your structure needs?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                Soil, seawater and embedded concrete each demand a different reference chemistry.
                Send us your survey data and our engineers will specify it for you.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-ink transition-opacity hover:opacity-85"
                >
                  Ask an engineer
                </Link>
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Browse the range
                  <ArrowRight size={15} strokeWidth={2.25} />
                </Link>
              </div>
            </div>

            {/* Quick environment → product routing */}
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10">
              {[
                { env: "Concrete & embedded", model: "Argent Crete", slug: "argent-crete" },
                { env: "Soil & buried pipeline", model: "Argent Terra", slug: "argent-terra" },
                { env: "Marine & seawater", model: "Argent Aqua", slug: "argent-aqua" },
                { env: "High temperature", model: "MMO/Ti NR-400", slug: "nr-400-mmo-ti" },
              ].map((row) => (
                <Link
                  key={row.slug}
                  href={`/products/${row.slug}`}
                  className="group flex items-center justify-between gap-4 bg-ink px-5 py-4 transition-colors hover:bg-white/5"
                >
                  <span className="text-sm text-white/60">{row.env}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    {row.model}
                    <ArrowRight
                      size={14}
                      strokeWidth={2.25}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Products ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Our Products
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-slate">
            Reference electrodes and corrosion monitoring accessories, shipped direct. Project
            quantities quoted on request.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />

      {/* ── About Us ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-panel p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { value: "4", label: "Electrode families" },
                { value: "9", label: "Models in stock" },
                { value: "±5 mV", label: "Potential stability" },
                { value: "20+ yr", label: "Design life" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold tracking-tight text-navy">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">About Us</h2>
            <p className="mt-5 text-sm leading-relaxed text-slate">
              Nuref is a manufacturer and technology provider specializing in Cathodic Protection
              reference electrodes and corrosion monitoring solutions. We design, develop,
              manufacture and supply high-performance references used to monitor and control CP
              systems for critical infrastructure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Every electrode is built to comply with international cathodic protection standards and
              tested to perform reliably in harsh industrial environments — from buried pipelines to
              marine and offshore structures.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex h-12 items-center rounded-full bg-ink px-8 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      <SelectionGuideTable />
    </main>
  );
}
