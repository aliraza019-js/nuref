import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { getAllProducts, getProductBySlug, formatPrice } from "@/lib/products";
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
    <main className="mx-auto max-w-5xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate">
        <Link href="/" className="hover:text-navy">Home</Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-navy">Products</Link>
        <ChevronRight size={12} />
        <span className="text-navy">{product.categoryLabel}</span>
      </nav>

      <div className="mt-6 grid gap-10 sm:grid-cols-2">
        <div className="relative aspect-square rounded-lg border border-powder bg-white">
          <Image src={product.image} alt={product.name} fill className="object-contain p-10" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate">{product.categoryLabel}</p>
          <h1 className="mt-2 text-2xl font-bold text-navy">{product.name}</h1>
          <p className="mt-4 text-xl font-bold text-black">{formatPrice(product.priceCents)}</p>
          <p className="mt-4 text-sm leading-relaxed text-black">{product.description}</p>

          <AddToCartForm product={product} />

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-black">
            <ShieldCheck size={16} className="text-navy" strokeWidth={1.75} />
            Meets international CP standards
          </div>

          <div className="mt-10 border-t border-powder pt-6">
            <h2 className="text-sm font-bold text-navy">Specifications</h2>
            <dl className="mt-3 space-y-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between text-sm">
                  <dt className="text-black">{spec.label}</dt>
                  <dd className="font-semibold text-black">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-powder pt-10">
          <h2 className="text-lg font-bold text-navy">You May Also Need</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
