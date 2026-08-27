import type { Metadata } from "next";

export const metadata: Metadata = { title: "Industries Served | Nuref" };

const INDUSTRIES = [
  "Oil & Gas Companies",
  "EPC Contractors",
  "Cathodic Protection Contractors",
  "Corrosion Engineers",
  "Infrastructure Owners",
  "Marine & Offshore Companies",
  "Pipeline Operators",
  "Water & Wastewater Utilities",
  "Power Generation Companies",
  "Petrochemical Plants",
  "Consultants",
  "Government Infrastructure Authorities",
  "Ports & Harbors",
  "Bridge & Highway Authorities",
  "Engineering Procurement Teams",
  "Industrial Asset Owners",
];

export default function IndustriesServedPage() {
  return (
    <main>
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Who we serve</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Industries Served</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink">
            Nuref reference electrodes and corrosion monitoring solutions are trusted across the
            industries responsible for protecting critical infrastructure from corrosion.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <div key={industry} className="flex items-center gap-3 rounded-2xl border border-powder p-5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-ink" />
              <span className="text-sm font-semibold leading-snug text-navy">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
