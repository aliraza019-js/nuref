import Link from "next/link";

interface GuideRow {
  env: string;
  recommended: string;
  recommendedSlug: string;
  life: string;
}

const ROWS: GuideRow[] = [
  { env: "Concrete & embedded", recommended: "Argent Crete (Ag/AgCl)", recommendedSlug: "argent-crete", life: "20+ yr" },
  { env: "Soil & buried pipeline", recommended: "Argent Terra or Cuprum Terra", recommendedSlug: "argent-terra", life: "10–20 yr" },
  { env: "Marine & seawater", recommended: "Argent Aqua (Ag/AgCl)", recommendedSlug: "argent-aqua", life: "Up to 20 yr" },
  { env: "Marine — durable / low-cost", recommended: "Zeta Aqua (Zinc)", recommendedSlug: "zeta-aqua", life: "20+ yr" },
  { env: "High temperature / deep well", recommended: "MMO/Ti — NR-400", recommendedSlug: "nr-400-mmo-ti", life: "25+ yr" },
];

export default function SelectionGuideTable() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.35fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Selection guide</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            Which electrode for which environment?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black">
            Selection follows the electrolyte your structure sits in and how long the electrode must
            stay in service. Start here — our engineers confirm against your survey data.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy"
          >
            Ask an engineer
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-powder shadow-sm">
          <div className="grid min-w-[520px] grid-cols-[1.05fr_1.15fr_0.8fr] bg-navy">
            <div className="px-5 py-4 text-[11px] font-bold uppercase tracking-wide text-powder">Environment</div>
            <div className="px-5 py-4 text-[11px] font-bold uppercase tracking-wide text-powder">Recommended</div>
            <div className="px-5 py-4 text-[11px] font-bold uppercase tracking-wide text-powder">Design life</div>
          </div>
          {ROWS.map((row) => (
            <div
              key={row.env}
              className="grid min-w-[520px] grid-cols-[1.05fr_1.15fr_0.8fr] border-t border-powder bg-white transition-colors hover:bg-powder/15"
            >
              <div className="px-5 py-4 text-sm text-black">{row.env}</div>
              <Link href={`/products/${row.recommendedSlug}`} className="px-5 py-4 text-sm font-semibold text-navy hover:text-gold">
                {row.recommended}
              </Link>
              <div className="px-5 py-4 text-sm text-black">{row.life}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
