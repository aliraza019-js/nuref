import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Applications | Nuref" };

const APPLICATIONS = [
  {
    title: "Buried Pipelines & Soil Surveys",
    description:
      "Cu/CuSO4 and Ag/AgCl reference electrodes are used to take reliable potential readings for cathodic protection surveys on buried pipelines and infrastructure.",
  },
  {
    title: "Marine & Offshore Structures",
    description:
      "Ag/AgCl reference electrodes support monitoring for submerged and marine cathodic protection systems, including offshore platforms and port infrastructure.",
  },
  {
    title: "Embedded & Long-Term Monitoring",
    description:
      "Zinc reference electrodes are suited to long-term embedded and submerged installations where durability is critical.",
  },
  {
    title: "Demanding CP Monitoring Systems",
    description:
      "MMO/Ti pseudo reference electrodes are engineered for demanding cathodic protection monitoring applications requiring long service life.",
  },
  {
    title: "Water & Wastewater Infrastructure",
    description:
      "Corrosion monitoring solutions support water and wastewater utility assets where long-term integrity is essential.",
  },
  {
    title: "Bridges, Ports & Government Infrastructure",
    description:
      "Reference electrodes support cathodic protection programs across bridges, highway authorities, ports, and other publicly owned infrastructure.",
  },
];

export default function ApplicationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Applications</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black">
        Nuref reference electrodes are used across a range of cathodic protection and corrosion
        monitoring applications.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {APPLICATIONS.map((app) => (
          <div key={app.title} className="rounded-lg border border-powder p-6">
            <h2 className="text-base font-bold text-navy">{app.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black">{app.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
