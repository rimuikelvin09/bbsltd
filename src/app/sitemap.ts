import type { MetadataRoute } from "next";
import { getProducts, getProjects } from "@/lib/content";
import { generateSlug } from "@/utils";
import { siteDetails } from "@/data/siteDetails";

/**
 * /sitemap.xml
 *
 * Next builds this route from the exported function, so the product and
 * portfolio entries come from the same content layer the pages render from.
 * Add a product to data/products.ts and it appears here on the next build -
 * there is no second list to remember to update, which is how sitemaps
 * normally rot.
 */
const BASE = siteDetails.siteUrl.replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, projects] = await Promise.all([getProducts(), getProjects()]);
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/portal`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${generateSlug(p.productTitle)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/portfolio/${generateSlug(p.title ?? String(p.id))}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...fixed, ...productPages, ...projectPages];
}
