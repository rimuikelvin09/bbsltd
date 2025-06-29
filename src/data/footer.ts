import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
  address: string;
} = {
  quickLinks: [
    {
      text: "About Us",
      url: "/about",
    },
    {
      text: "Client Portal",
      url: "http://bbsltd.ke/auth",
    },
    {
      text: "Agent Portal",
      url: "http://bbsltd.ke/auth",
    },
    {
      text: "Portfolio",
      url: "/portfolio",
    },
  ],
  email: "info@bbsltd.co.ke",
  telephone: "+254 722 333324",
  socials: {
    x: "https://x.com/BenchmarkBuild4",
    facebook: "https://www.facebook.com/bbsltdke",
    youtube: "https://www.youtube.com/@bbsltdofficial",
    linkedin: "https://www.linkedin.com/company/bbsltdofficial",
    instagram: "https://www.instagram.com/bbsltdofficial/",
  },
  address:
    "Room F10, 1st Floor, Residential Wing, K-Unity Building - Kiambu Town",
};
