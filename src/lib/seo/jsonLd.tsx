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

/**
 * One per /learn article. Article is what Google expects for written
 * editorial; the author is the business, not a person, because these are
 * written by the team rather than bylined.
 */
export function articleJsonLd(args: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/learn/${args.slug}#article`,
    headline: args.title,
    description: args.description,
    url: `${BASE}/learn/${args.slug}`,
    datePublished: args.publishedAt,
    inLanguage: "en-KE",
    image: args.image ? [args.image] : undefined,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/**
 * One per /learn episode. PodcastEpisode is the precise type even though the
 * audio lives on YouTube - the page is the episode's home, and this is what
 * ties it to the show rather than leaving it as a loose video.
 */
export function podcastEpisodeJsonLd(args: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  videoId?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${BASE}/learn/${args.slug}#episode`,
    name: args.title,
    description: args.description,
    url: `${BASE}/learn/${args.slug}`,
    datePublished: args.publishedAt,
    inLanguage: "en-KE",
    image: args.image,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "The Smart Builder Real Estate Podcast",
      url: `${BASE}/learn`,
  },
    associatedMedia: args.videoId
      ? {
          "@type": "VideoObject",
          name: args.title,
          embedUrl: `https://www.youtube-nocookie.com/embed/${args.videoId}`,
          thumbnailUrl: args.image,
          uploadDate: args.publishedAt,
          description: args.description,
        }
      : undefined,
    publisher: { "@id": ORG_ID },
  };
}

/** One per downloadable guide. */
export function guideJsonLd(args: {
  title: string;
  description: string;
  slug: string;
  fileUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "@id": `${BASE}/learn/${args.slug}#guide`,
    name: args.title,
    description: args.description,
    url: `${BASE}/learn/${args.slug}`,
    encodingFormat: "application/pdf",
    contentUrl: `${BASE}${args.fileUrl}`,
    publisher: { "@id": ORG_ID },
  };
}


/**
 * A CASE STUDY, as structured data.
 *
 * schema.org has no "case study" type, so this is an Article whose `about`
 * is the building itself. That pairing is what lets Google understand the
 * page is reporting ON a real project rather than selling one, and it is
 * the honest description: the page IS an article, and its subject IS a
 * building in Kiambu.
 *
 * Deliberately NO aggregateRating or review markup. Rich-result stars on a
 * page with no actual reviews is exactly the kind of thing that earns a
 * manual action, and it would make a liar of the page beside it.
 */
export function caseStudyJsonLd(study: {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  completed?: string;
  status: string;
}) {
  const url = `${BASE}/portfolio/${study.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${study.headline} - ${study.title}`,
    description: study.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(study.completed ? { datePublished: `${study.completed}-01-01` } : {}),
    about: {
      "@type": "Place",
      name: study.title,
      address: {
        "@type": "PostalAddress",
        addressLocality: study.location,
        addressCountry: "KE",
      },
    },
  };
}
