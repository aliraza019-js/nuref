import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQs | Nuref" };

const FAQS = [
  {
    q: "What is a cathodic protection reference electrode?",
    a: "A reference electrode provides a stable reference potential used to monitor and control cathodic protection systems, allowing engineers to verify that a structure is adequately protected from corrosion.",
  },
  {
    q: "Which reference electrode is right for my application?",
    a: "It depends on your environment (soil, freshwater, marine, embedded) and monitoring requirements. Visit our Products page for guidance, or contact our sales team for a recommendation.",
  },
  {
    q: "Do your products meet international standards?",
    a: "Yes. Nuref reference electrodes are designed to comply with international cathodic protection standards and are built for harsh industrial environments.",
  },
  {
    q: "How do I place an order?",
    a: "Add the electrodes you need to your cart and check out securely online by card. You'll receive an order confirmation by email once payment is complete.",
  },
  {
    q: "How is my order shipped?",
    a: "Orders are shipped directly to you. For shipping timelines or bulk/project orders, contact our sales team and we'll confirm details for your location.",
  },
  {
    q: "Can I get a quote for a large or custom order?",
    a: "Yes — reach out through our Contact Us page with your requirements and our team will follow up with pricing and lead time.",
  },
  {
    q: "Do you offer installation guidance or calibration services?",
    a: "Yes, Nuref offers installation guidance as well as calibration and testing services. Contact us for details relevant to your project.",
  },
];

export default function FaqsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Frequently Asked Questions</h1>

      <div className="mt-10 divide-y divide-powder">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <h2 className="text-base font-bold text-navy">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
