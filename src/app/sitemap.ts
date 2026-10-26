import type { MetadataRoute } from "next";
import { getProducts, getProjects } from "@/lib/content";
import { getLearnRoutes } from "@/lib/learn";
import { getCaseStudies } from "@/data/caseStudies";
import { PROFILE_PUBLISHED } from "@/data/profile";
import { categories } from "@/data/learn";
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
  const [products, projects, learn] = await Promise.all([
    getProducts(),
    getProjects(),
    getLearnRoutes(),
  ]);
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/about/how-we-work`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/about/leadership`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    /**
     * /portfolio is the case-study listing. While every study is still a
     * draft it is a holding page, so it stays OUT of the sitemap and the
     * gallery carries the section. Both come back automatically the moment
     * a case study loses its draft flag.
     */
    ...(getCaseStudies().length > 0
      ? [
          {
            url: `${BASE}/portfolio`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
    { url: `${BASE}/portfolio/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...(PROFILE_PUBLISHED
      ? [
          {
            url: `${BASE}/about/profile`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.7,
          },
        ]
      : []),
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/portal`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${generateSlug(p.productTitle)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Case studies carry real narrative and are the pages most likely to rank
  // on a long-tail query ("phased apartment build kiambu"), so they sit
  // above the legacy project entries in priority.
  const casePages: MetadataRoute.Sitemap = getCaseStudies().map((c) => ({
    url: `${BASE}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/portfolio/${generateSlug(p.title ?? String(p.id))}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // One entry per category landing page. These are the pages that can
  // actually rank - /learn/legislation for "NCA requirements Kenya" and so
  // on - which is the whole reason the section is split six ways.
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => !c.parked)
    .map((c) => ({
      url: `${BASE}/learn/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Every publication. Drafts are already excluded by getLearnRoutes in a
  // production build, so an unfinished piece is never announced to Google.
  const learnPages: MetadataRoute.Sitemap = learn.map((item) => ({
    url: `${BASE}/learn/${item.category}/${item.slug}`,
    lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
    changeFrequency: "monthly",
    priority: item.form === "written" ? 0.8 : 0.7,
  }));

  return [
    ...fixed,
    ...productPages,
    ...casePages,
    ...projectPages,
    ...categoryPages,
    ...learnPages,
  ];
}
