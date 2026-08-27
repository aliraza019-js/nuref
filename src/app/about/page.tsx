import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About Nuref | Nuref" };

const OFFERINGS = [
  {
    title: "Ag/AgCl reference electrodes",
    body: "Silver / silver chloride references for marine, brackish and freshwater cathodic protection.",
  },
  {
    title: "Cu/CuSO₄ reference electrodes",
    body: "Copper / copper sulfate references for soil-side and buried pipeline monitoring.",
  },
  {
    title: "Zinc reference electrodes",
    body: "Durable zinc references for embedded concrete and permanently submerged service.",
  },
  {
    title: "MMO/Ti pseudo references",
    body: "Inert mixed metal oxide titanium electrodes for very long service life.",
  },
  {
    title: "Corrosion monitoring accessories",
    body: "Test station terminal boards, shunts, coupons and field calibration kits.",
  },
  {
    title: "Installation guidance",
    body: "Practical guidance on placement, backfill, cabling and commissioning.",
  },
  {
    title: "Calibration & testing",
    body: "Traceable calibration and field testing so your survey data stays defensible.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">About Nuref</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              A manufacturer, not a reseller.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink">
              Nuref is a manufacturer and technology provider specializing in Cathodic Protection
              reference electrodes and corrosion monitoring solutions. We design, develop, manufacture
              and supply high-performance reference electrodes used to monitor and control CP systems
              for critical infrastructure — ensuring long-term corrosion prevention and asset
              integrity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink">
              Our products are built to comply with international cathodic protection standards and to
              perform reliably in harsh industrial environments — from buried pipelines to marine and
              offshore structures.
            </p>
          </div>
          <div className="relative flex h-[340px] items-center justify-center rounded-2xl bg-panel p-10">
            <Image
              src="/products/NUREF_ARGENT_AQUA.png"
              alt="Nuref Ag/AgCl reference electrode"
              width={420}
              height={300}
              className="h-auto w-full max-w-[300px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy">What we offer</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((o) => (
            <div key={o.title} className="rounded-2xl border border-powder p-6">
              <span className="mb-3.5 block h-1 w-8 rounded-full bg-ink" />
              <h3 className="text-base font-bold leading-snug text-navy">{o.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{o.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
