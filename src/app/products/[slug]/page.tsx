import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Wrench } from "lucide-react";
import { getAllProducts, getProductBySlug, formatPrice, CATEGORY_LABELS } from "@/lib/products";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | Nuref` : "Product | Nuref" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getAllProducts().filter((p) => p.slug !== product.slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    url: `${siteUrl}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/products/${product.slug}`,
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate">
        <Link href="/" className="hover:text-navy">Home</Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-navy">Products</Link>
        <ChevronRight size={12} />
        <span className="text-navy">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-14 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-powder bg-powder/20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: "radial-gradient(56% 50% at 50% 42%, rgba(240,180,41,0.12), transparent 70%)" }}
          />
          <Image src={product.image} alt={product.name} fill className="object-contain p-14" />
        </div>

        <div>
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-navy">
            {product.sku}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-black">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold tracking-tight text-navy">{formatPrice(product.priceCents)}</span>
            <span className="text-xs text-slate">per unit · excl. tax &amp; freight</span>
          </div>

          <AddToCartForm product={product} />

          <Link
            href="/contact"
            className="mt-4 block rounded-xl border border-powder py-3.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-powder/20"
          >
            Request a quote for 10+ units
          </Link>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-powder bg-powder/15 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wide text-navy">Availability</div>
              <div className="mt-1 text-sm text-navy">In stock · ships in 3–5 days</div>
            </div>
            <div className="rounded-xl border border-powder bg-powder/15 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wide text-navy">Compliance</div>
              <div className="mt-1 text-sm text-navy">{CATEGORY_LABELS[product.category]} · International CP standards</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.25fr_0.85fr]">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy">Technical specification</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-powder">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[0.85fr_1.15fr] border-b border-powder last:border-b-0">
                <div className="bg-powder/20 px-5 py-3.5 text-sm font-semibold text-navy">{spec.label}</div>
                <div className="px-5 py-3.5 text-sm text-black">{spec.value}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-11 text-2xl font-extrabold tracking-tight text-navy">Typical applications</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.applications.map((app) => (
              <div key={app} className="flex items-start gap-2.5 rounded-xl bg-powder/15 px-4 py-4">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                <span className="text-sm leading-relaxed text-black">{app}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-powder p-6 shadow-[0_30px_56px_-32px_rgba(20,40,76,0.28)] lg:sticky lg:top-28 lg:self-start">
          <h3 className="text-lg font-bold text-navy">What&rsquo;s included</h3>
          {product.includes.map((item) => (
            <div key={item} className="flex items-start gap-2.5 border-b border-powder/60 py-2.5 last:border-b-0">
              <span className="text-sm font-extrabold leading-relaxed text-gold">✓</span>
              <span className="text-sm leading-relaxed text-black">{item}</span>
            </div>
          ))}

          <div className="mt-5 rounded-xl bg-navy p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Wrench size={15} strokeWidth={2} />
              Need installation support?
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-powder">
              Nuref provides installation guidance, calibration and field testing services.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-lg bg-gold px-4 py-2 text-xs font-bold text-navy transition-opacity hover:opacity-90"
            >
              Talk to an engineer
            </Link>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-powder pt-10">
          <h2 className="text-lg font-bold text-navy">You May Also Need</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
