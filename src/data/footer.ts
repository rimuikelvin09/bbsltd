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
      url: "http://app.bbsltd.co.ke/",
    },
    {
      text: "Agent Portal",
      url: "http://app.bbsltd.co.ke/",
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
  address: "K-unity Building (Mapa House), Kiambu town, 1st Floor, Room 1",
};
