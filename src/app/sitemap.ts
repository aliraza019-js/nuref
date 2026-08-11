import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages = [
    "",
    "/about",
    "/products",
    "/industries-served",
    "/applications",
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
