import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products | Nuref" };

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
