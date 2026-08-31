import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // /industries-served and /applications are deliberately excluded: they are
  // hidden from the nav and footer, so they should not be advertised here either.
  const staticPages = [
    "",
    "/about",
    "/products",
    "/faqs",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const productPages = getAllProducts().map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages];
}
