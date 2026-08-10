import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Lock, ShieldCheck, Truck } from "lucide-react";
import { getAllProducts, formatPrice } from "@/lib/products";
import ElectrodeGraphic from "@/components/ElectrodeGraphic";

export default function Home() {
  const products = getAllProducts();

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-powder">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:grid-cols-2 sm:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Cathodic Protection Electrodes
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
              Reference Electrodes Built for Critical Infrastructure
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-black">
              Nuref designs, manufactures, and supplies high-performance reference electrodes and
              corrosion monitoring solutions engineered to comply with international cathodic
              protection standards for the harshest industrial environments.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="rounded-md bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Shop Electrodes
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-navy px-6 py-3 text-center text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          <ElectrodeGraphic className="mx-auto w-full max-w-sm" />
        </div>
      </section>

      {/* Trust row */}
      <section className="border-b border-powder bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="flex-shrink-0 text-navy" strokeWidth={1.75} />
            <span className="text-sm font-medium text-black">Meets international CP standards</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock size={22} className="flex-shrink-0 text-navy" strokeWidth={1.75} />
            <span className="text-sm font-medium text-black">Secure card checkout</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck size={22} className="flex-shrink-0 text-navy" strokeWidth={1.75} />
            <span className="text-sm font-medium text-black">Shipped directly to your site</span>
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
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-navy shadow-sm ring-1 ring-powder">
                  <BadgeCheck size={12} strokeWidth={2} />
                  In Stock
                </span>
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
