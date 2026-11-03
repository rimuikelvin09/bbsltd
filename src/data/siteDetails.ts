export const siteDetails = {
  siteName: "Benchmark Building Solutions ltd",
  siteDescription:
    "Design, county approvals and construction on one contract. A Kenyan building contractor since 2012, with architects and engineers in house.",
  /**
   * The CANONICAL domain, and the single source for every absolute URL the
   * site emits: metadataBase, every canonical tag, the Open Graph URL, the
   * sitemap, robots.txt and the structured data @ids.
   *
   * It is bbsltd.ke, bare, no www. Moved from bbsltd.co.ke on 3 Nov 2026 so
   * the website and email share one domain. bbsltd.co.ke and www.bbsltd.ke
   * both 308-redirect here at Vercel; keep bbsltd.co.ke renewed so old links,
   * print and QR codes keep landing.
   *
   * Only the apex A record and the www CNAME at HostAfrica point at Vercel.
   * The MX, SPF and autodiscover records are Microsoft 365's: do not touch.
   */
  siteUrl: "https://bbsltd.ke",
  metadata: {
    title: "Benchmark Building Solutions ltd",
    description:
      "A Kenyan building contractor since 2012. Design, county approvals and construction on one contract, with architects and engineers in house.",
  },
  language: "en-us",
  locale: "en-US",
  siteLogo: `${process.env.BASE_PATH || ""}/images/colored-logo.png`,
  siteWhiteLogo: `${process.env.BASE_PATH || ""}/images/white-logo.png`,
  siteLogomark: `${process.env.BASE_PATH || ""}/images/logomark.png`,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "",
};
