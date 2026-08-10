// Static product catalog. There's no admin dashboard, so pricing/specs are
// edited here directly. Prices below are PLACEHOLDER demo values — replace
// with the real catalog (SKUs, prices, specs, images) once available. No
// schema change is needed to swap this out; only this file.

export interface Product {
  slug: string;
  name: string;
  category: "ag-agcl" | "cu-cuso4" | "zinc" | "mmo-ti";
  categoryLabel: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  image: string;
  specs: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "ag-agcl-reference-electrode",
    name: "Silver/Silver Chloride (Ag/AgCl) Reference Electrode",
    category: "ag-agcl",
    categoryLabel: "Ag/AgCl Reference Electrode",
    shortDescription:
      "High-stability reference electrode for cathodic protection monitoring in soil, freshwater, and marine environments.",
    description:
      "The Ag/AgCl reference electrode provides a stable, long-life reference potential for cathodic protection monitoring across buried and submerged infrastructure. Designed for harsh industrial environments and built to comply with international cathodic protection standards.",
    priceCents: 24900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Type", value: "Ag/AgCl" },
      { label: "Typical Use", value: "Soil, freshwater, marine" },
      { label: "Standard Compliance", value: "International CP standards" },
    ],
  },
  {
    slug: "cu-cuso4-reference-electrode",
    name: "Copper/Copper Sulfate (Cu/CuSO4) Reference Electrode",
    category: "cu-cuso4",
    categoryLabel: "Cu/CuSO4 Reference Electrode",
    shortDescription:
      "Industry-standard reference electrode for soil and buried pipeline cathodic protection surveys.",
    description:
      "The Cu/CuSO4 reference electrode is the industry-standard choice for soil-based cathodic protection potential surveys on buried pipelines and infrastructure, offering reliable, repeatable readings in the field.",
    priceCents: 18900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Type", value: "Cu/CuSO4" },
      { label: "Typical Use", value: "Buried pipelines, soil surveys" },
      { label: "Standard Compliance", value: "International CP standards" },
    ],
  },
  {
    slug: "zinc-reference-electrode",
    name: "Zinc Reference Electrode",
    category: "zinc",
    categoryLabel: "Zinc Reference Electrode",
    shortDescription: "Robust reference electrode for long-term embedded and submerged monitoring installations.",
    description:
      "The Zinc reference electrode is well suited to long-term embedded and submerged monitoring installations, offering durable performance for critical infrastructure corrosion monitoring.",
    priceCents: 21900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Type", value: "Zinc" },
      { label: "Typical Use", value: "Embedded, submerged installations" },
      { label: "Standard Compliance", value: "International CP standards" },
    ],
  },
  {
    slug: "mmo-ti-pseudo-reference-electrode",
    name: "MMO/Ti Pseudo Reference Electrode",
    category: "mmo-ti",
    categoryLabel: "MMO/Ti Pseudo Reference Electrode",
    shortDescription: "Mixed metal oxide/titanium pseudo reference electrode for demanding CP monitoring applications.",
    description:
      "The MMO/Ti pseudo reference electrode is engineered for demanding cathodic protection monitoring applications, combining mixed metal oxide coating technology with a titanium substrate for long service life.",
    priceCents: 29900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Type", value: "MMO/Ti" },
      { label: "Typical Use", value: "Demanding CP monitoring applications" },
      { label: "Standard Compliance", value: "International CP standards" },
    ],
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
