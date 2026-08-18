import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-powder">
            Manufacturer and technology provider of Cathodic Protection reference electrodes and
            corrosion monitoring solutions for critical infrastructure.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="text-white hover:text-gold">All Products</Link></li>
            <li><Link href="/products" className="text-white hover:text-gold">Ag/AgCl Electrodes</Link></li>
            <li><Link href="/products" className="text-white hover:text-gold">Cu/CuSO&#8324; Electrodes</Link></li>
            <li><Link href="/products" className="text-white hover:text-gold">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-white hover:text-gold">About Nuref</Link></li>
            <li><Link href="/industries-served" className="text-white hover:text-gold">Industries Served</Link></li>
            <li><Link href="/applications" className="text-white hover:text-gold">Applications</Link></li>
            <li><Link href="/faqs" className="text-white hover:text-gold">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Contact Sales</h3>
          <p className="text-sm text-powder">Have a project or bulk order? Our team responds fast.</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-bold text-navy transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-powder">
          <span>© {new Date().getFullYear()} Nuref. All rights reserved.</span>
          <span>Secure card checkout · Shipped worldwide</span>
        </div>
      </div>
    </footer>
  );
}
