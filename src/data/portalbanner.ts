/**
 * CLIENT PORTAL BANNER, on the home page
 *
 * Rewritten Oct 2026. The previous copy came from the starter template the
 * site was built on: "Convenient Project Management", "Track Projects
 * Anytime". It was live on the home page.
 *
 * This is the teaser for /portal, so it carries the SAME three things in the
 * same order as data/features.tsx, written short. If a capability is added
 * or dropped, both files change together, otherwise the home page starts
 * promising something the portal page does not.
 */
export const portalBannerData = {
  title: "Every stage, on the record, as it happens.",
  subheading: "Client Portal",
  features: [
    {
      title: "Where the project stands",
      description:
        "Progress photographs and site records, dated as they are taken.",
      icon: "FiEye",
    },
    {
      title: "Where the money stands",
      description:
        "Your cost position against the bill of quantities, with invoices and payments in one list.",
      icon: "FiBriefcase",
    },
    {
      title: "Every document in one place",
      description:
        "Drawings, approvals and contracts, always in the current version.",
      icon: "FiBook",
    },
  ],
  imageSrc: "/images/features/mockup5.png",
};
