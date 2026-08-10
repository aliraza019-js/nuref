import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Products | Nuref" };

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Products</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-black">
        Reference electrodes and corrosion monitoring solutions for cathodic protection systems.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-powder transition-colors hover:border-navy"
          >
            <div className="relative aspect-square w-full bg-white">
              <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
            </div>
            <div className="border-t border-powder p-5">
              <h2 className="text-sm font-bold text-navy">{product.name}</h2>
              <p className="mt-2 text-sm text-black">{product.shortDescription}</p>
              <p className="mt-4 text-base font-bold text-black">{formatPrice(product.priceCents)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
