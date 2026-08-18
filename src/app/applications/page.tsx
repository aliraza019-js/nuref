import type { Metadata } from "next";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

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
    <main>
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">In the field</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Applications</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black">
            Where Nuref reference electrodes are used across cathodic protection and corrosion
            monitoring programmes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATIONS.map((app) => (
            <div key={app.title} className="overflow-hidden rounded-2xl border border-powder">
              <div className="flex h-[150px] items-center justify-center bg-powder/20">
                <ImageIcon size={26} strokeWidth={1.5} className="text-slate" />
              </div>
              <div className="p-6">
                <h2 className="text-base font-bold leading-snug text-navy">{app.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-black">{app.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-11 text-center">
          <Link
            href="/products"
            className="inline-block rounded-xl bg-navy px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}
