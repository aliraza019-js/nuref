import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Nuref | Nuref" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">About Nuref</h1>
      <p className="mt-6 text-base leading-relaxed text-black">
        Nuref is a manufacturer and technology provider specializing in Cathodic Protection (CP)
        Reference Electrodes and corrosion monitoring solutions. We design, develop, manufacture,
        and supply high-performance reference electrodes used to monitor and control cathodic
        protection systems for critical infrastructure, ensuring long-term corrosion prevention and
        asset integrity.
      </p>
      <p className="mt-4 text-base leading-relaxed text-black">
        Our products are designed to comply with international cathodic protection standards and
        are built to perform reliably in harsh industrial environments — from buried pipelines to
        marine and offshore infrastructure.
      </p>

      <h2 className="mt-12 text-xl font-bold text-navy">What We Offer</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-black">
        <li>Silver/Silver Chloride (Ag/AgCl) Reference Electrodes</li>
        <li>Copper/Copper Sulfate (Cu/CuSO4) Reference Electrodes</li>
        <li>Zinc Reference Electrodes</li>
        <li>MMO/Ti Pseudo Reference Electrodes</li>
        <li>Corrosion monitoring accessories</li>
        <li>Installation guidance</li>
        <li>Calibration and testing</li>
      </ul>
    </main>
  );
}
