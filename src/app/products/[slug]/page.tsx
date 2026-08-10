import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, formatPrice } from "@/lib/products";
import AddToCartForm from "@/components/AddToCartForm";

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

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="relative aspect-square rounded-lg border border-powder bg-white">
          <Image src={product.image} alt={product.name} fill className="object-contain p-10" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate">{product.categoryLabel}</p>
          <h1 className="mt-2 text-2xl font-bold text-navy">{product.name}</h1>
          <p className="mt-4 text-xl font-bold text-black">{formatPrice(product.priceCents)}</p>
          <p className="mt-4 text-sm leading-relaxed text-black">{product.description}</p>

          <AddToCartForm product={product} />

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
    </main>
  );
}
