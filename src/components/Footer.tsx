import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ink">
      {/* Newsletter card, lifted so it straddles the page above and the footer */}
      <div className="px-6">
        <div className="mx-auto -mt-14 flex max-w-5xl flex-wrap items-center justify-between gap-8 rounded-3xl bg-white px-8 py-9 shadow-[0_30px_70px_-30px_rgba(20,40,76,0.35)] sm:px-12">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-navy">Subscribe Newsletter</h3>
            <p className="mt-1 text-sm text-slate">Product updates and technical notes — no spam.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-powder">
            Manufacturer and technology provider of Cathodic Protection reference electrodes and
            corrosion monitoring solutions for critical infrastructure.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-white">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="text-white hover:text-ink">All Products</Link></li>
            <li><Link href="/products" className="text-white hover:text-ink">Ag/AgCl Electrodes</Link></li>
            <li><Link href="/products" className="text-white hover:text-ink">Cu/CuSO&#8324; Electrodes</Link></li>
            <li><Link href="/products" className="text-white hover:text-ink">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-white hover:text-ink">About Nuref</Link></li>
            <li><Link href="/faqs" className="text-white hover:text-ink">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-white">Contact Sales</h3>
          <p className="text-sm text-powder">Have a project or bulk order? Our team responds fast.</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink transition-opacity hover:opacity-90"
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

      {/* Oversized wordmark, clipped at the base of the page */}
      <div aria-hidden className="overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="-mb-[0.22em] select-none text-center text-[19vw] font-extrabold leading-[0.8] tracking-tight text-white/[0.06]">
            NUREF
          </div>
        </div>
      </div>
    </footer>
  );
}
