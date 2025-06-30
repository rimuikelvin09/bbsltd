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

export interface Product {
  id: number;
  productTitle: string;
  description: {
    a: string;
    b: string;
    c: string;
  }[];
  fileType: string;
  fileName: string;
  objectKey: string;
  fileUrl: string;
  createdAt: string;
  productVp: string;
  productHook: string;
  videoUrl: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  client: string;
  typeOfContract: string;
  location: string;
  videoUrl: string;
  files: {
    foundation: {
      fileName: string;
      objectKey: string;
      fileUrl: string;
      fileType: string;
    };
    walling: {
      fileName: string;
      objectKey: string;
      fileUrl: string;
      fileType: string;
    };
    roofing: {
      fileName: string;
      objectKey: string;
      fileUrl: string;
      fileType: string;
    };
    finishing: {
      fileName: string;
      objectKey: string;
      fileUrl: string;
      fileType: string;
    };
  };
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
