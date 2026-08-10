import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-powder bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-black">
              Manufacturer and technology provider of Cathodic Protection reference electrodes and
              corrosion monitoring solutions for critical infrastructure.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-navy">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-black hover:text-navy">About Nuref</Link></li>
              <li><Link href="/products" className="text-black hover:text-navy">Products</Link></li>
              <li><Link href="/industries-served" className="text-black hover:text-navy">Industries Served</Link></li>
              <li><Link href="/applications" className="text-black hover:text-navy">Applications</Link></li>
              <li><Link href="/faqs" className="text-black hover:text-navy">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-navy">Contact Sales</h3>
            <p className="text-sm text-black">
              Have a project or bulk order? Our team responds fast.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-powder pt-6 text-xs text-black">
          © {new Date().getFullYear()} Nuref. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
