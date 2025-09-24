import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  resources: IMenuItem[];
  email: string;
  telephones: string[];
  socials: ISocials;
  address: string;
} = {
  resources: [
    {
      text: "Jenga Kwako Ammortization Table",
      url: "/documents/amortizationtable.pdf",
    },
    {
      text: "Jenga Kwako Requirements",
      url: "/documents/jkrequirements.pdf",
    },
    {
      text: "Diaspora Payment Guide - USA",
      url: "/documents/usapaymentguide.pdf",
    },
    {
      text: "Client Portal",
      url: "http://bbsltd.ke/auth",
    },
    {
      text: "Agent Portal",
      url: "http://bbsltd.ke/auth",
    },
  ],
  email: "info@bbsltd.ke",
  telephones: ["+254 722 333324", "+254 114 400596"],
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
