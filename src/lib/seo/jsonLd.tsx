import { siteDetails } from "@/data/siteDetails";

/**
 * STRUCTURED DATA
 * ---------------
 * What a search engine reads instead of guessing. Without it Google infers
 * the business from page text; with it, the name, address, phone, founding
 * year and social profiles are stated as fact and can be matched against the
 * Google Business Profile - which is what connects the website to the map
 * pack where "contractor near me" searches actually land.
 *
 * The facts below are written out rather than imported from footer.ts on
 * purpose. Structured data is a claim made to third parties; it should be
 * legible in one place and changed deliberately, not inherited from a
 * component's display data. If the phone or address changes, it changes in
 * BOTH files - that is the cost of the clarity.
 *
 * GeneralContractor is a real schema.org type (LocalBusiness ->
 * HomeAndConstructionBusiness -> GeneralContractor), and more specific than
 * the Organization most sites settle for.
 */
const BASE = siteDetails.siteUrl.replace(/\/+$/, "");

export const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name: siteDetails.siteName,
    alternateName: "Benchmark Building Solutions ltd",
    url: `${BASE}/`,
    logo: `${BASE}/images/colored-logo.png`,
    image: `${BASE}/images/seoimage.jpg`,
    description: siteDetails.metadata.description,
    email: "info@bbsltd.ke",
    telephone: "+254722333324",
    foundingDate: "2012",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room F10, 1st Floor, Residential Wing, K-Unity Building",
      addressLocality: "Kiambu Town",
      addressRegion: "Kiambu",
      addressCountry: "KE",
    },
    areaServed: { "@type": "Country", name: "Kenya" },
    knowsAbout: [
      "Residential construction",
      "Commercial construction",
      "Architectural design",
      "Quantity surveying",
      "Building approvals and compliance",
      "Affordable housing mortgages",
    ],
    sameAs: [
      "https://www.facebook.com/bbsltdke",
      "https://www.youtube.com/@bbsltdofficial",
      "https://www.linkedin.com/company/bbsltdofficial",
      "https://www.instagram.com/bbsltdofficial/",
      "https://www.tiktok.com/@bbsltdofficial",
      "https://x.com/bbsltdofficial",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${BASE}/`,
    name: siteDetails.siteName,
    inLanguage: "en-KE",
    publisher: { "@id": ORG_ID },
  };
}

/** One per product page. Ties the service back to the business. */
export function serviceJsonLd(args: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/products/${args.slug}#service`,
    name: args.name,
    description: args.description,
    url: `${BASE}/products/${args.slug}`,
    serviceType: "Construction",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Kenya" },
  };
}

/** Renders a JSON-LD block. Our own data, so no user input is serialised. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
