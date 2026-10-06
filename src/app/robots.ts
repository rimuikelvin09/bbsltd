import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/siteDetails";

const BASE = siteDetails.siteUrl.replace(/\/+$/, "");

/**
 * /robots.txt
 *
 * Everything is crawlable except the API routes, which have nothing for a
 * search engine and would otherwise show up as crawl errors. The sitemap
 * line is the part that matters: it is how a crawler finds the full list of
 * pages without having to follow its way there.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
