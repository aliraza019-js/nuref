// Static product catalog. There's no admin dashboard, so pricing/specs are
// edited here directly. Prices and technical spec values below are
// PLACEHOLDER/provisional — plausible engineering-style figures pending the
// client's final pricing and spec sign-off. Product names (Argent Crete,
// Argent Terra, etc.) are confirmed real product naming, not placeholders.

export interface ProductSpec {
  label: string;
  value: string;
}

export type ProductCategory = "ag-agcl" | "cu-cuso4" | "zinc" | "mmo-ti" | "accessories";

export interface Product {
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  chips: string[];
  shortDescription: string;
  description: string;
  priceCents: number;
  image: string;
  specs: ProductSpec[];
  applications: string[];
  includes: string[];
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "ag-agcl": "Ag/AgCl",
  "cu-cuso4": "Cu/CuSO₄",
  zinc: "Zinc",
  "mmo-ti": "MMO/Ti",
  accessories: "Accessories",
};

export const PRODUCTS: Product[] = [
  {
    slug: "argent-crete",
    sku: "NUREF ARGENT CRETE",
    name: "Nuref Argent Crete",
    category: "ag-agcl",
    chips: ["Concrete", "Embedded"],
    shortDescription: "Concrete-embedded Ag/AgCl reference electrode for reinforced concrete cathodic protection.",
    description:
      "Nuref Argent Crete is a silver/silver chloride (Ag/AgCl) reference electrode built for permanent embedment in reinforced concrete, giving corrosion engineers a stable, long-life reference potential for monitoring CP systems on decks, piles and other concrete structures.",
    priceCents: 24900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Ag/AgCl (Silver/Silver Chloride)" },
      { label: "Application", value: "Concrete embedded" },
      { label: "Reference potential", value: "−0.800 V vs. SCE (nominal)" },
      { label: "Stability", value: "±5 mV over design life" },
      { label: "Operating temperature", value: "−5 °C to +60 °C" },
      { label: "Design life", value: "20+ years embedded" },
      { label: "Cable", value: "10 m XLPE, custom lengths on request" },
    ],
    applications: [
      "Reinforced concrete CP systems",
      "Bridge decks and marine piles",
      "Parking structures and columns",
      "Long-term unattended monitoring",
    ],
    includes: [
      "Ag/AgCl reference electrode, concrete-rated",
      "10 m monitoring cable",
      "Calibration certificate",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "argent-terra",
    sku: "NUREF ARGENT TERRA",
    name: "Nuref Argent Terra",
    category: "ag-agcl",
    chips: ["Soil", "Buried"],
    shortDescription: "Soil/buried Ag/AgCl reference electrode for underground pipeline cathodic protection.",
    description:
      "Nuref Argent Terra is a silver/silver chloride (Ag/AgCl) reference electrode configured for soil and buried service, giving stable, low-drift potential readings on underground pipelines and structures.",
    priceCents: 22900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Ag/AgCl (Silver/Silver Chloride)" },
      { label: "Application", value: "Soil / buried" },
      { label: "Reference potential", value: "−0.800 V vs. SCE (nominal)" },
      { label: "Stability", value: "±5 mV over design life" },
      { label: "Operating temperature", value: "−10 °C to +50 °C" },
      { label: "Design life", value: "15–20 years buried" },
      { label: "Cable", value: "10 m HMWPE, custom lengths on request" },
    ],
    applications: [
      "Buried pipeline CIPS and DCVG surveys",
      "Test station potential measurement",
      "Tank bottoms and soil-side assets",
      "Distribution network monitoring",
    ],
    includes: [
      "Ag/AgCl reference electrode",
      "10 m HMWPE monitoring cable",
      "Backfill pack",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "argent-aqua",
    sku: "NUREF ARGENT AQUA",
    name: "Nuref Argent Aqua",
    category: "ag-agcl",
    chips: ["Marine", "Submerged"],
    shortDescription: "Marine/seawater Ag/AgCl reference electrode for offshore and submerged cathodic protection.",
    description:
      "Nuref Argent Aqua is a silver/silver chloride (Ag/AgCl) reference electrode built for marine and seawater immersion, supplied fully potted with a sealed cable entry for permanent submerged installation.",
    priceCents: 25900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Ag/AgCl (Silver/Silver Chloride)" },
      { label: "Application", value: "Marine / seawater" },
      { label: "Reference potential", value: "−0.800 V vs. SCE (seawater, 25 °C)" },
      { label: "Stability", value: "±5 mV over design life" },
      { label: "Operating temperature", value: "−5 °C to +60 °C" },
      { label: "Design life", value: "Up to 20 years submerged" },
      { label: "Housing", value: "Impact-resistant polymer, IP68" },
    ],
    applications: [
      "Offshore platform CP monitoring",
      "Jetty, quay and harbour structures",
      "Ballast tanks and sea chests",
      "Submerged pipeline monitoring",
    ],
    includes: [
      "Ag/AgCl reference electrode, factory potted",
      "10 m sealed monitoring cable",
      "Calibration certificate",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "cuprum-terra",
    sku: "NUREF CUPRUM TERRA",
    name: "Nuref Cuprum Terra",
    category: "cu-cuso4",
    chips: ["Soil", "Buried"],
    shortDescription: "Soil/buried Cu/CuSO₄ reference electrode — the industry-standard half-cell for pipeline CP.",
    description:
      "Nuref Cuprum Terra is the industry-standard copper/copper sulfate (Cu/CuSO₄) reference electrode for soil and buried service, used for potential measurement on buried pipelines and soil-side structures.",
    priceCents: 18900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Cu/CuSO₄ (Copper/Copper Sulfate)" },
      { label: "Application", value: "Soil / buried" },
      { label: "Reference potential", value: "−0.850 V vs. Cu/CuSO₄ criterion" },
      { label: "Stability", value: "±10 mV in stable soil conditions" },
      { label: "Operating temperature", value: "−10 °C to +50 °C" },
      { label: "Design life", value: "10–15 years buried" },
      { label: "Housing", value: "Ceramic plug, UV-stable body" },
    ],
    applications: [
      "Buried pipeline CIPS and DCVG surveys",
      "Test station potential measurement",
      "Tank bottoms and soil-side assets",
      "Distribution network monitoring",
    ],
    includes: [
      "Cu/CuSO₄ reference electrode with ceramic plug",
      "10 m HMWPE monitoring cable",
      "Backfill pack",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "zeta-aqua",
    sku: "NUREF ZETA AQUA",
    name: "Nuref Zeta Aqua",
    category: "zinc",
    chips: ["Marine", "Submerged"],
    shortDescription: "Marine/seawater zinc reference electrode for long-term submerged cathodic protection.",
    description:
      "Nuref Zeta Aqua is a high-purity zinc reference electrode configured for marine and seawater service — a robust reference for long-term submerged monitoring.",
    priceCents: 21900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Zinc" },
      { label: "Application", value: "Marine / seawater" },
      { label: "Reference potential", value: "−1.100 V vs. Cu/CuSO₄ (nominal)" },
      { label: "Stability", value: "±20 mV over design life" },
      { label: "Element", value: "High-purity zinc, MIL-A-18001 alloy" },
      { label: "Operating temperature", value: "−20 °C to +70 °C" },
      { label: "Design life", value: "20+ years submerged" },
    ],
    applications: [
      "Offshore platform CP monitoring",
      "Ballast tanks and sea chests",
      "Jetty and harbour structures",
      "Permanently submerged installations",
    ],
    includes: [
      "Zinc reference electrode",
      "10 m XLPE monitoring cable",
      "Installation guidance sheet",
      "Calibration certificate",
    ],
  },
  {
    slug: "zeta-terra",
    sku: "NUREF ZETA TERRA",
    name: "Nuref Zeta Terra",
    category: "zinc",
    chips: ["Soil", "Buried"],
    shortDescription: "Soil/buried zinc reference electrode for long-term embedded cathodic protection.",
    description:
      "Nuref Zeta Terra is a high-purity zinc reference electrode configured for soil and buried service — a durable reference for long-term embedded monitoring.",
    priceCents: 20900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Zinc" },
      { label: "Application", value: "Soil / buried" },
      { label: "Reference potential", value: "−1.100 V vs. Cu/CuSO₄ (nominal)" },
      { label: "Stability", value: "±20 mV over design life" },
      { label: "Element", value: "High-purity zinc, MIL-A-18001 alloy" },
      { label: "Operating temperature", value: "−20 °C to +70 °C" },
      { label: "Design life", value: "20+ years buried" },
    ],
    applications: [
      "Buried pipeline CP systems",
      "Distribution network monitoring",
      "Long-term unattended installations",
      "Tank bottoms and soil-side assets",
    ],
    includes: [
      "Zinc reference electrode",
      "10 m XLPE monitoring cable",
      "Cementitious backfill (where specified)",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "nr-400-mmo-ti",
    sku: "NR-400",
    name: "MMO/Ti Pseudo Reference Electrode",
    category: "mmo-ti",
    chips: ["Long-life", "Inert"],
    shortDescription: "Mixed metal oxide / titanium pseudo reference for demanding, long-service CP monitoring.",
    description:
      "A mixed metal oxide coated titanium pseudo reference electrode engineered for demanding cathodic protection monitoring where very long service life and dimensional stability are required. Inert, non-consumable and maintenance free.",
    priceCents: 29900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Reference type", value: "Pseudo reference (MMO-coated titanium)" },
      { label: "Stability", value: "±15 mV, environment dependent" },
      { label: "Substrate", value: "Grade 1 titanium, MMO catalytic coating" },
      { label: "Operating temperature", value: "−20 °C to +80 °C" },
      { label: "Design life", value: "25+ years" },
      { label: "Housing", value: "Bare rod or potted assembly" },
      { label: "Cable", value: "10 m XLPE, custom lengths on request" },
    ],
    applications: [
      "High-temperature CP monitoring",
      "Deep well and casing installations",
      "Long-life unattended monitoring points",
      "Aggressive chemical environments",
    ],
    includes: [
      "MMO/Ti pseudo reference electrode",
      "10 m XLPE monitoring cable",
      "Test report",
      "Installation guidance sheet",
    ],
  },
  {
    slug: "nr-a10-terminal-board",
    sku: "NR-A10",
    name: "Test Station Terminal Board",
    category: "accessories",
    chips: ["Accessory", "Test station"],
    shortDescription: "Terminal board and shunt assembly for pipeline test stations and monitoring points.",
    description:
      "A pre-wired terminal board and shunt assembly for pipeline test stations, giving a clean, labelled termination for reference electrode, structure and coupon leads.",
    priceCents: 8900,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Terminals", value: "8-way, nickel-plated brass" },
      { label: "Shunt", value: "0.01 Ω / 1 Ω options" },
      { label: "Material", value: "Glass-filled polycarbonate" },
      { label: "Operating temperature", value: "−30 °C to +80 °C" },
      { label: "Ingress rating", value: "IP66 when housed" },
      { label: "Mounting", value: "DIN rail or direct fix" },
      { label: "Labelling", value: "Engraved, customer-specified" },
    ],
    applications: [
      "Pipeline test stations",
      "Coupon and probe termination",
      "Retrofit of legacy test posts",
      "Multi-electrode monitoring points",
    ],
    includes: ["Terminal board assembly", "Mounting hardware", "Engraved labels", "Wiring diagram"],
  },
  {
    slug: "nr-a20-calibration-kit",
    sku: "NR-A20",
    name: "Field Calibration Kit",
    category: "accessories",
    chips: ["Accessory", "Calibration"],
    shortDescription: "Portable kit for verifying reference electrode potential against a certified master cell.",
    description:
      "A portable field calibration kit for verifying reference electrode potential against a certified master cell, so survey data stays traceable between scheduled recalibrations.",
    priceCents: 14500,
    image: "/products/placeholder.svg",
    specs: [
      { label: "Master cell", value: "Certified Cu/CuSO₄, traceable" },
      { label: "Accuracy", value: "±2 mV against reference standard" },
      { label: "Case", value: "Impact-resistant, foam-lined" },
      { label: "Operating temperature", value: "0 °C to +45 °C" },
      { label: "Recalibration", value: "12-month interval recommended" },
      { label: "Contents", value: "Master cell, solution, leads, log book" },
      { label: "Certification", value: "Calibration certificate supplied" },
    ],
    applications: [
      "Pre-survey electrode verification",
      "Routine QA of monitoring points",
      "Contractor field kits",
      "Commissioning checks",
    ],
    includes: [
      "Certified master cell",
      "Electrolyte solution and crystals",
      "Test leads and adapters",
      "Calibration certificate and log book",
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
