"use client";

import { useState } from "react";
import Link from "next/link";
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
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);

  return (
    <header className="sticky top-0 z-50 border-b border-powder bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center" aria-label="Cart">
            <ShoppingCart size={22} strokeWidth={1.75} className="text-navy" />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
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
              className="py-2 text-sm font-medium text-black transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
