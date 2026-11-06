import { IMenuItem, ISocials } from "@/types";

/**
 * FOOTER CONTENT
 * --------------
 * Rebuilt Nov 2026.
 *
 * THE ONE SEO JOB A FOOTER DOES is to put internal links in front of the
 * deep pages that nothing else links to. That is why `learn` and `company`
 * exist here: the financing hub, the two tools and the company pages had
 * almost no inbound internal links. It is NOT a place to repeat keywords.
 * Search engines discount content that appears on every page, so treat
 * everything here as a convenience for readers first.
 *
 * `resources` USED TO POINT STRAIGHT AT THREE PDFs. It now points at the
 * pages those PDFs became, and each page offers the file. A visitor who
 * lands on a raw PDF from a footer has left the site; one who lands on the
 * page can use the tool and still download the file.
 *
 * NOT IN HERE, and each for a reason:
 *   NCA number        Kelvin's call, 6 Nov. It can be misused by people
 *                     passing themselves off as us, and it is given on
 *                     request. The same reasoning kept the registration
 *                     number and KRA PIN off the Corporate Profile.
 *   Newsletter        There is no list. A field that collects addresses
 *                     nobody writes to is worse than no field.
 *   Privacy, Terms    Removed until the pages exist. Logged on the website
 *                     backlog. Do not add the links back before the pages.
 */
export const footerDetails: {
  resources: IMenuItem[];
  company: IMenuItem[];
  email: string;
  telephones: string[];
  socials: ISocials;
  address: string;
  mapUrl: string;
  hours: { days: string; time: string }[];
} = {
  /** Learn. Ordered by how often somebody arrives looking for it. */
  resources: [
    {
      text: "Affordable construction financing",
      url: "/learn/financing",
    },
    {
      text: "Find your repayment",
      url: "/learn/guides/jenga-kwako-repayment-table",
    },
    {
      text: "What the bank asks for",
      url: "/learn/guides/jenga-kwako-requirements-checklist",
    },
    {
      text: "The Smart Builder Podcast",
      url: "/learn/podcast",
    },
    {
      text: "Guides and downloads",
      url: "/learn/guides",
    },
  ],

  /** Company. "Agent Portal" is gone: it pointed at /portal, same as Client Portal. */
  company: [
    { text: "About us", url: "/about" },
    { text: "How we work", url: "/about/how-we-work" },
    { text: "Leadership", url: "/about/leadership" },
    { text: "Our work", url: "/portfolio/gallery" },
    { text: "Client portal", url: "/portal" },
    { text: "Contact us", url: "/contact" },
  ],

  email: "info@bbsltd.ke",
  telephones: ["+254 722 333324", "+254 114 400596"],

  socials: {
    whatsapp: "https://whatsapp.com/channel/0029VbDtnYcHVvTVFSpbkb3Z",
    x: "https://x.com/BenchmarkBuild4",
    facebook: "https://www.facebook.com/bbsltdke",
    youtube: "https://www.youtube.com/@bbsltdofficial",
    linkedin: "https://www.linkedin.com/company/bbsltdofficial",
    instagram: "https://www.instagram.com/bbsltdofficial/",
  },

  address:
    "Room F10, 1st Floor, Residential Wing, K-Unity Building, Kiambu Town",

  /** Opens Google Maps in a new tab. No embed in the footer: see Footer.tsx. */
  mapUrl: "https://maps.google.com/?q=K-Unity+Building+Kiambu+Town+Kenya",

  /** A real local-search signal, and the thing people ring to ask. */
  hours: [
    { days: "Monday to Friday", time: "8.00am to 5.00pm" },
    { days: "Saturday", time: "By appointment" },
  ],
};
