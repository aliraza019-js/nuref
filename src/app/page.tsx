import Link from "next/link";
import Image from "next/image";
import { getAllProducts, formatPrice } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-powder">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Cathodic Protection Reference Electrodes, Built for Critical Infrastructure
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black">
            Nuref designs, manufactures, and supplies high-performance reference electrodes and
            corrosion monitoring solutions engineered to comply with international cathodic
            protection standards for the harshest industrial environments.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Shop Electrodes
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-navy">Our Products</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-black">
          High-performance reference electrodes for cathodic protection monitoring and control.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-powder transition-colors hover:border-navy"
            >
              <div className="relative aspect-square w-full bg-white">
                <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
              </div>
              <div className="border-t border-powder p-4">
                <p className="text-sm font-semibold text-navy">{product.categoryLabel}</p>
                <p className="mt-2 text-sm font-bold text-black">{formatPrice(product.priceCents)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Nuref */}
      <section className="border-t border-powder bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-bold text-navy">Standards Compliant</h3>
              <p className="mt-2 text-sm text-black">
                Every electrode is designed to comply with international cathodic protection
                standards.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Built for the Field</h3>
              <p className="mt-2 text-sm text-black">
                Engineered for harsh industrial environments across pipelines, marine, and
                infrastructure assets.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Fast, Direct Shipping</h3>
              <p className="mt-2 text-sm text-black">
                Order online and have electrodes shipped directly to your site or office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-powder">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-navy">Need Help Choosing the Right Electrode?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-black">
            Our team can help you select the right reference electrode for your project.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </main>
  );
}
