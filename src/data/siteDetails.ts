export const siteDetails = {
  siteName: "Benchmark Building Solutions ltd",
  siteDescription:
    "Experience a stress-free, A-Z construction journey with Benchmark Building Solutions Ltd. From conceptualization and architectural drawings to project completion and handover, we handle every step so you can enjoy peace of mind throughout your residential or commercial project in Kenya.",
  /**
   * The CANONICAL domain, and the single source for every absolute URL the
   * site emits: metadataBase, every canonical tag, the Open Graph URL, the
   * sitemap, robots.txt and the structured data @ids.
   *
   * It is bbsltd.co.ke, bare, no www - that is what the live site answers on.
   * It previously read www.bbsltd.ke, which is the mail and Microsoft 365
   * domain and serves no website. Left unchanged it would have told Google
   * the canonical version of every page lived on a domain that does not host
   * the site, which is worse than having no canonical at all.
   */
  siteUrl: "https://bbsltd.co.ke",
  metadata: {
    title: "Benchmark Building Solutions ltd",
    description:
      "Benchmark Building Solutions Ltd offers a seamless, end-to-end construction experience in Kenya. Our A-Z approach covers everything from architectural design to final handover.",
  },
  language: "en-us",
  locale: "en-US",
  siteLogo: `${process.env.BASE_PATH || ""}/images/colored-logo.png`,
  siteWhiteLogo: `${process.env.BASE_PATH || ""}/images/white-logo.png`,
  siteLogomark: `${process.env.BASE_PATH || ""}/images/logomark.png`,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "",
};
