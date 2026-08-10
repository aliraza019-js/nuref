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
  "Bridge and Highway Authorities",
  "Engineering Procurement Teams",
  "Industrial Asset Owners",
];

export default function IndustriesServedPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Industries Served</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black">
        Nuref reference electrodes and corrosion monitoring solutions are trusted across a wide
        range of industries responsible for protecting critical infrastructure from corrosion.
      </p>

      <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {INDUSTRIES.map((industry) => (
          <li key={industry} className="flex items-start gap-3 text-base text-black">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            {industry}
          </li>
        ))}
      </ul>
    </main>
  );
}
