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
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = cartItemCount(items);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    // Floating "island" bar: fixed so the page background shows above and
    // around it, rather than a full-bleed bar sitting in the document flow.
    // Pages offset for it with --nr-header-h (see globals.css).
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-powder bg-white/95 shadow-[0_10px_30px_-12px_rgba(20,40,76,0.18)] backdrop-blur-md">
        <div className="grid h-[68px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-6">
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center justify-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1.5 text-sm font-medium transition-colors ${
                    active ? "text-navy" : "text-ink hover:text-navy"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-ink" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openDrawer();
              }}
              aria-label={count > 0 ? `Open cart, ${count} items` : "Open cart"}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                count > 0
                  ? "bg-ink text-white shadow-[0_6px_18px_-6px_rgba(10,10,10,0.6)]"
                  : "border border-border bg-white text-navy hover:bg-panel"
              }`}
            >
              <ShoppingCart size={16} strokeWidth={2} />
              Cart
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
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
          <nav className="flex flex-col border-t border-powder px-5 py-4 sm:px-6 lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm font-medium transition-colors hover:text-navy ${
                  isActive(link.href) ? "text-navy" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
