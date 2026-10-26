import { Product } from "@/types";
import { generateSlug } from "@/utils";

/**
 * THE INFORMATION ARCHITECTURE, AS DATA
 *
 * Five top-level items and one action button. The order is the argument:
 *
 *   Products   - primacy. The highest-intent page on the site, so it takes
 *                the slot the Serial Position Effect makes strongest.
 *   Our Work   - proof. A separate job from purchase: a cautious client
 *                needs to see finished work BEFORE considering a product.
 *                Case studies rather than a gallery, because recognition
 *                of one's own situation is what converts.
 *   Learn      - the differentiator, mirroring the six hub categories
 *                exactly, under the same names they carry on the page.
 *   About Us   - who you are dealing with. Three items, so a plain
 *                dropdown rather than a mega panel; panel width should
 *                signal how much is behind it.
 *   Contact Us - recency, and the only button.
 *
 * HOME IS DELIBERATELY ABSENT from the desktop bar. The logo goes home on
 * every site on the internet; spending the strongest slot restating that
 * costs a conversion path. It stays as the first row of the mobile drawer,
 * where vertical space is free and the convention is less universal.
 */

export interface NavLink {
  label: string;
  href: string;
  /** One line under the label in a mega panel. */
  blurb?: string;
  /** Renders marked and unclickable. Visible on purpose - the breadth is
   *  part of the pitch, and a silent gap reads as an oversight. */
  soon?: boolean;
  soonLabel?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavEntry {
  label: string;
  /** Present on items that are also a destination in their own right. */
  href?: string;
  columns?: NavColumn[];
}

/** Built from the content layer, so adding a product updates the menu. */
export function buildNavigation(products: Product[]): NavEntry[] {
  const link = (p: Product): NavLink => ({
    label: p.productTitle,
    href: `/products/${generateSlug(p.productTitle)}`,
    blurb: p.productVp,
  });

  return [
    {
      label: "Products",
      href: "/products",
      columns: [
        {
          heading: "Build from the ground up",
          links: products.slice(0, 3).map(link),
        },
        {
          heading: "Other ways we work",
          links: products.slice(3, 6).map(link),
        },
        {
          heading: "Before you decide",
          links: [
            {
              label: "Mortgage calculator",
              href: "/products/jenga-kwako#calculator",
              blurb: "What you can borrow, and the monthly",
            },
            {
              // A marketing page, not portal access - so it sits where
              // people are already weighing you up, not in a utility strip
              // meant for things they already have accounts for.
              label: "Client Portal",
              href: "/portal",
              blurb: "Track your build as it happens",
            },
            {
              label: "Compare all six",
              href: "/products",
              blurb: "Which one fits your situation",
            },
          ],
        },
      ],
    },
    {
      /**
       * Renamed from "Portfolio". "Featured Projects" promised pictures and
       * undersold what these are; "Case Studies" as a top-level item is
       * consultancy language an investor scans for but a homeowner does not.
       * "Our Work" is read fluently by both, and the CONTENT still does the
       * case-study job. The URL stays /portfolio so nothing already linked
       * or indexed breaks.
       */
      label: "Our Work",
      /**
       * Points at the GALLERY, not /portfolio, while the case studies are
       * held back. A top-level nav item must never land on a holding page -
       * that is the one click every visitor is most likely to make. Put it
       * back to /portfolio when the first case study ships.
       */
      href: "/portfolio/gallery",
      columns: [
        {
          heading: "Our work",
          links: [
            {
              label: "Case Studies",
              href: "/portfolio",
              blurb: "The brief, the constraint, the result",
              soon: true,
              soonLabel: "Coming soon",
            },
            {
              label: "Gallery",
              href: "/portfolio/gallery",
              blurb: "Photographs, by category",
            },
          ],
        },
      ],
    },
    {
      label: "Learn",
      href: "/learn",
      columns: [
        {
          heading: "Watch & read",
          links: [
            { label: "Podcast", href: "/learn/podcast", blurb: "The Smart Builder Real Estate Podcast" },
            {
              label: "Articles",
              href: "/learn/articles",
              blurb: "Costs, process, what goes wrong",
              soon: true,
              soonLabel: "Coming soon",
            },
            {
              label: "Trends",
              href: "/learn/trends",
              blurb: "What shifts elsewhere mean here",
              soon: true,
              soonLabel: "Coming soon",
            },
          ],
        },
        {
          heading: "Use & download",
          links: [
            { label: "Guides", href: "/learn/guides", blurb: "Checklists, tables, document lists" },
            {
              label: "Legislation",
              href: "/learn/legislation",
              blurb: "NCA, NEMA, county and the Code",
              soon: true,
              soonLabel: "Coming soon",
            },
            {
              label: "3D Models",
              href: "/learn/3d-models",
              blurb: "Walk a house before you build it",
              soon: true,
              soonLabel: "Coming soon",
            },
          ],
        },
        {
          heading: "Start here",
          links: [{ label: "All of it", href: "/learn", blurb: "The Learn landing page" }],
        },
      ],
    },
    {
      label: "About Us",
      href: "/about",
      columns: [
        {
          heading: "The firm",
          links: [
            {
              label: "Corporate Profile",
              href: "/about/profile",
              blurb: "Who we are, in one document",
              soon: true,
              soonLabel: "Coming soon",
            },
            {
              // Renamed from "Our Philosophy": says what the reader gets.
              label: "How We Work",
              href: "/about/how-we-work",
              blurb: "Our philosophy and our approach",
            },
            {
              // Renamed from "Governance": investor language. A client
              // looking for who runs the firm looks for Leadership.
              label: "Leadership",
              href: "/about/leadership",
              blurb: "Directors and the technical team",
            },
          ],
        },
      ],
    },
  ];
}

/** The action button. Separate because it is styled and placed differently. */
export const navCta = { label: "Contact Us", href: "/contact" };
