"use client";

import { useState } from "react";
import Link from "next/link";
import FaqAccordionItem from "@/components/FaqAccordionItem";

const FAQS = [
  {
    q: "What is a cathodic protection reference electrode?",
    a: "A reference electrode provides a stable, known reference potential used to monitor and control cathodic protection systems, allowing engineers to verify that a structure is adequately protected from corrosion.",
  },
  {
    q: "Which reference electrode is right for my application?",
    a: "It depends on your environment — soil, freshwater, marine or embedded — and on how long the electrode must stay in service. Use the selection guide on our home page, or contact our engineers with your survey data for a recommendation.",
  },
  {
    q: "Do your products meet international standards?",
    a: "Yes. Nuref reference electrodes are designed to comply with international cathodic protection standards and are built for harsh industrial environments.",
  },
  {
    q: "How do I place an order?",
    a: "Add the electrodes you need to your cart and check out securely online by card. You will receive an order confirmation by email once payment is complete.",
  },
  {
    q: "How is my order shipped?",
    a: "Orders are shipped direct to your delivery address by our fulfilment partner. For shipping timelines or bulk and project orders, contact our sales team and we will confirm details for your location.",
  },
  {
    q: "Can I get a quote for a large or custom order?",
    a: "Yes — send your requirements through the contact form and our team will follow up with pricing, lead time and documentation.",
  },
  {
    q: "Do you offer installation guidance or calibration services?",
    a: "Yes. Nuref provides installation guidance as well as calibration and field testing services. Contact us for details relevant to your project.",
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main>
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Support</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div>
          {FAQS.map((item, i) => (
            <FaqAccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-powder bg-powder/15 p-7">
          <div>
            <div className="text-lg font-bold text-navy">Still have a question?</div>
            <div className="mt-1 text-sm text-black">Our engineers answer technical enquiries the same working day.</div>
          </div>
          <Link
            href="/contact"
            className="rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
