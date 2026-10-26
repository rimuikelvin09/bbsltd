export interface IMenuItem {
  text: string;
  url: string;
  children?: IMenuItem[];
}

export interface ILeadership {
  title: string;
  description: string;
  imageSrc: string;
  /** Shown on hover. Falls back to imageSrc where a second frame does not exist. */
  imageHoverSrc?: string;
  bullets: ILeadershipBullet[];
}

export interface ILeadershipBullet {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IFeature {
  title: string;
  description: string;
  imageSrc: string;
  bullets: IFeatureBullet[];
}

export interface IFeatureBullet {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface DailyTip {
  heading: string;
  tip: string;
}

export interface IStats {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface ISocials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export interface IPodcast {
  title: string;
  description: string;
  imageSrc: string;
  episodes: IPodcastEpisode[];
}

export interface IPodcastEpisode {
  title: string;
  description?: string;
  url: string;
}

export interface ContactHeroProps {
  heading: string;
  subheading?: string;
  id?: string;
}
export interface AboutUsHeroProps {
  heading?: string;
  subheading?: string;
  id?: string;
}
export interface PortfolioHeroProps {
  heading?: string;
  id?: string;
}

export interface PortalHeroProps {
  heading?: string;
  subheading?: string;
  id?: string;
}
export interface MapSectionProps {
  title: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
}

export interface OurPromiseItem {
  title: string;
  description: string;
  values?: string[];
  icon?: string;
}

export interface OurApproachStep {
  title: string;
  description: string;
}

export interface OurApproachData {
  title: string;
  description: string;
  steps: OurApproachStep[];
  imageSrc: string;
}

export interface IAboutUs {
  title: string;
  description: string[];
  videoUrl: string;
  thumbnailUrl: string;
}

export interface ITestimonial {
  videoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  publishedAt?: string;
}

/** One supporting point on a product page. */
export interface ProductPoint {
  /** Two to five words. Rendered as a heading beside a numeral. */
  title: string;
  /** One sentence. */
  body: string;
}

export interface Product {
  id: number;
  productTitle: string;
  /**
   * A short factual badge on the product card. Exists so the financing
   * hook travels WITH the click instead of being stranded in a band
   * further down the home page that a converting visitor never reaches.
   * Keep it factual - a rate and a term, not a computed monthly figure,
   * which would need an invented reference loan.
   */
  badge?: string;
  /**
   * True where Jenga Kwako financing is a sensible next step for someone
   * reading this product. Drives the financing block on the product page.
   * NOT set on Jenga Kwako itself - that page carries the calculator.
   */
  financing?: boolean;
  /** Short line shown on the product card in the grid. */
  productVp: string;
  /** Large headline at the top of the product's own page. */
  productHook: string;
  /**
   * The single call to action on this product's page. Verb-first, one per
   * page (Creative & Marketing SOP 1.2). Falls back to "Start Your Legacy"
   * when omitted, which suits a full-build product but reads oddly on a
   * renovation or a consultancy engagement.
   */
  ctaLabel?: string;
  /**
   * Optional anchor for the hero button. When set, the button scrolls to
   * this target instead of opening the enquiry form -- used where the page
   * carries a tool the visitor should reach first, such as the Jenga Kwako
   * affordability calculator.
   */
  ctaHref?: string;
  /**
   * The points a visitor must not miss, shown below the fold. Cap at
   * three: if everything is emphasised, nothing is. Replaces the old
   * {a, b, c} grouping, which was an artefact of the droplet API.
   */
  points: ProductPoint[];
  fileType: string;
  /** Path under /public, e.g. "/images/products/jenga-kwako.jpg". */
  fileUrl: string;
  /**
   * Leftovers from the old DigitalOcean Spaces backend. Optional so new
   * content does not have to supply them; safe to delete once nothing
   * in the codebase reads them.
   */
  fileName?: string;
  objectKey?: string;
  createdAt?: string;
  videoUrl?: string;
}

/** One build-stage image belonging to a project. */
export interface ProjectFile {
  fileType: string;
  /** Path under /public, e.g. "/images/projects/foo-roofing.jpg". */
  fileUrl: string;
  fileName?: string;
  objectKey?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  typeOfContract: string;
  location: string;
  /** Optional. Leave "" to hide the "Watch Now" button. */
  videoUrl: string;
  files: {
    foundation: ProjectFile;
    walling: ProjectFile;
    roofing: ProjectFile;
    finishing: ProjectFile;
  };
  createdAt?: string;
}

import { Country, KenyaCounty } from "@/data/location";

/**
 * DEPRECATED. The enquiry form no longer uses this shape - it posts the
 * LeadPayload in lib/leads/types.ts directly. Left here only because other
 * code may still import it; delete once nothing does.
 */
export interface LeadFormData {
  firstName: string;
  secondName: string;
  surName?: string;
  gender: "MALE" | "FEMALE" | "RATHER_NOT_SAY" | "";
  dob?: string;
  idNumber?: string;
  projectName?: string;
  email: string;
  countryCode?: string;
  phoneNumber: string;
  preferredContact: "CALL" | "SMS" | "WHATSAPP" | "EMAIL" | "";
  clientSource?: string;
  locationType: "KENYA" | "INTERNATIONAL" | "";
  county?: KenyaCounty;
  country?: Country;
  productOffering: string;
  productTag?: string;
  bankName?: string;
  bankBranch?: string;
  consultancySubtags?: string[];
  followUpDate?: string;
  notes?: string;
  consent: boolean;
}

/* ------------------------------------------------------------------ */
/* THE LEARN SECTION (/learn)                                          */
/*                                                                     */
/* Two axes, deliberately separate. `category` is where a thing lives  */
/* - it decides the URL and which landing card it sits behind. `form`  */
/* is how it is rendered. A legislation note and an article are two    */
/* categories of the same written form, which is why adding a seventh  */
/* category needs no new component.                                    */
/* ------------------------------------------------------------------ */

export type LearnCategory =
  | "podcast"
  | "3d-models"
  | "articles"
  | "guides"
  | "legislation"
  | "trends";

export type LearnForm = "video" | "written" | "download";

/** A paragraph, subheading or list inside a written piece. */
export interface LearnBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

/** One show-note row on an episode. Display only; mm:ss as written. */
export interface LearnNote {
  at: string;
  text: string;
}

/** One of the six cards on /learn. Order in the array is order on screen. */
export interface LearnCategoryDef {
  slug: LearnCategory;
  title: string;
  /** One line on the card. */
  blurb: string;
  /** Longer, on the category page itself. */
  intro: string;
  form: LearnForm;
  /** Default layout on desktop. Visitors can switch; this is the opener. */
  defaultView: "list" | "grid";
  /** Designed separately, so its card never links anywhere yet. */
  parked?: boolean;
  /**
   * What the category page says while it is parked. Lives here rather than
   * in the page so each one gives a real reason instead of a generic
   * holding line - "coming soon" with no explanation reads as abandoned.
   */
  parkedNote?: string;
}

/** A category with the numbers filled in at build time. */
export interface LearnCategorySummary extends LearnCategoryDef {
  count: number;
  image?: string;
}

export interface LearnItem {
  slug: string;
  category: LearnCategory;
  form: LearnForm;
  title: string;
  /** One or two sentences. The card blurb AND the meta description. */
  summary: string;
  /** ISO yyyy-mm-dd. Sorts every list, newest first. */
  publishedAt: string;
  /** From the controlled vocabulary in data/learn.ts. Never free text. */
  topics: string[];

  /** form: "video" */
  videoId?: string;
  thumbnail?: string;
  notes?: LearnNote[];
  duration?: string;

  /** form: "download" */
  fileUrl?: string;
  fileMeta?: string;

  /** form: "written" */
  blocks?: LearnBlock[];
  readingMinutes?: number;

  /** Visible in development, excluded from production builds. */
  draft?: boolean;
}

/** One public question and, once answered, the team's reply. */
export interface LearnQuestion {
  id: string;
  /** The publication it belongs to. Questions never float free of an item. */
  slug: string;
  question: string;
  askerName: string;
  askerPlace?: string;
  askedAt: string;
  answer?: string;
  answeredBy?: string;
  /** Podcast questions only, e.g. "22:30". */
  timestamp?: string;
}
