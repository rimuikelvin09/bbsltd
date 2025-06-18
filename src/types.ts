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
  values?: string[]; // Optional core values
  icon?: string; // If you want to add icons later
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
  description: string[]; // Description is now an array of strings
  videoUrl: string;
  thumbnailUrl: string;
}

// Define and export the ITestimonial interface
export interface ITestimonial {
  videoId: string; // YouTube video ID
  title: string; // Video title from YouTube
  description?: string; // Optional description from YouTube
  thumbnail?: string; // Thumbnail URL for potential future use
  publishedAt?: string; // Publication date
}

export interface Product {
  id: number;
  productTitle: string;
  description: string;
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
  fileType: string;
  fileName: string;
  objectKey: string;
  fileUrl: string;
  createdAt: string;
  client: string;
  typeOfContract: string;
  location: string;
  videoUrl: string;
}
