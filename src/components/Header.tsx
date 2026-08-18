"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import Logo from "./Logo";
import { useCartStore, cartItemCount } from "@/store/useCartStore";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Nuref" },
  { href: "/products", label: "Products" },
  { href: "/industries-served", label: "Industries Served" },
  { href: "/applications", label: "Applications" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-powder bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-black transition-colors hover:bg-powder/20"
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-powder bg-powder/20 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            <ShoppingCart size={17} strokeWidth={1.9} />
            Cart
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-navy">
              {count}
            </span>
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} className="text-navy" /> : <Menu size={22} className="text-navy" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-powder px-6 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-2 text-sm font-medium transition-colors hover:text-navy ${
                isActive(link.href) ? "text-navy" : "text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
