export interface IMenuItem {
  text: string;
  url: string;
  children?: IMenuItem[];
}

export interface ILeadership {
  title: string;
  description: string;
  imageSrc: string;
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
