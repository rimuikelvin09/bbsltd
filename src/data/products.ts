import { Product } from "@/types";

/**
 * PRODUCT CATALOGUE
 * -----------------
 * Source of truth for the six routes on the home page, the header dropdown,
 * the footer column and each /products/<slug> page. Slugs generate from
 * productTitle.
 *
 * COPY FRAMEWORK (Creative & Marketing SOP v2.0, Section 1)
 * Hook -> UVP -> CTA, with exactly ONE persuasion lever per product, named
 * in the comment above it. Per SOP 1.1, do not stack levers when editing.
 *
 *   productHook = the Hook. The <h1>, and the largest element on the page.
 *   productVp   = the UVP. Shown on the card in the home listing.
 *   points      = at most THREE supporting points, below the fold.
 *   ctaLabel    = the single CTA (SOP 1.2). Omit for "Start Your Legacy".
 *   ctaHref     = optional. When set, the hero button scrolls to that anchor
 *                 instead of opening the enquiry form, used where there is
 *                 a tool on the page that should come first.
 *
 * COPY REVISION, OCT 2026 (Segment 1 of the site-wide rewrite)
 * Three rules came out of that review and they apply to every edit here:
 *
 *   1. NO EM DASHES OR EN DASHES. Not a style preference. Kenyan writers,
 *      including professional copywriters, almost never reach for them, so
 *      the character itself reads as machine-written. Use a full stop, a
 *      comma or a colon. There are none left in this file: keep it that way.
 *   2. CONTRACTIONS. "You shouldn't", not "you should not". The voice is a
 *      builder talking straight, not a company writing formally.
 *   3. THE HOOK IS THE READER'S SITUATION, in the second person, naming what
 *      they are actually afraid of.
 *
 * WHAT CHANGED IN THIS REVISION, and why, product by product:
 *
 *   Jenga Kwako   The old copy said a project of up to KES 20 million could
 *                 take the mortgage and top up the difference. That was
 *                 wrong and it was live. The real ceiling is KES 15 million
 *                 INCLUSIVE OF LAND, with the mortgage covering up to KES
 *                 10.5 million of it, 9.5% fixed, up to 25 years, and the
 *                 money may be used to buy the plot as well as build on it.
 *                 Those are the only figures to quote on this product.
 *   Diaspora      The hook now names the real fear. People abroad send money
 *                 to a contractor, a relative or a friend and some of them
 *                 end up with no house. The product is the answer to that,
 *                 so the copy sells verifiability and the fact that the
 *                 counterparty is an accountable company rather than an
 *                 individual with a mobile number.
 *   Repairs       Previously written as fault diagnosis. Most of this work
 *                 is remodelling: a facelift, cracks made good, paint, tiles,
 *                 worn-out finishes. The page was selling the wrong service
 *                 and would have attracted the wrong enquiries. The
 *                 diagnostic angle is kept as ONE point, not the argument.
 *   Consultancy   The page only described pre-construction. The advisory
 *                 half, where somebody else is building and the client wants
 *                 a professional watching the work, was invisible. The
 *                 points are now the two tracks plus the no-obligation line.
 *   Labour Only   Reframed onto the crew. On this product the workforce IS
 *                 the thing being bought, so experience leads.
 *
 * NO NAMED CLIENTS OR PROJECTS. The copy sells the service on its own terms.
 *
 * ON FIGURES: the only hard numbers used are ones we can stand behind, being
 * the KMRC mortgage terms, our accreditation and headcount, and the 6-12
 * month residential duration already published in our own FAQ. Where a
 * market statistic would strengthen a hook it is deliberately absent rather
 * than invented; supply a sourced figure and it can go in. Per-square-metre
 * rates and price ranges are the obvious gap: they are what people search
 * for, and adding them would be the single biggest copy improvement left.
 */

export const products: Product[] = [
  /**
   * LEVER: Loss Aversion.
   * What they stand to lose is not money first. It is their own time and
   * attention, every week, for a year. The hook names that.
   */
  {
    id: 1,
    productTitle: "Jenga Stress Free",
    financing: true,
    productHook: "You shouldn’t have to project-manage your own house.",
    productVp:
      "Architect, engineer, quantity surveyor and site team on one contract with us, so drawings, county approvals and the build are one job with one person answerable, instead of four you have to hold together yourself.",
    fileType: "IMAGE",
    fileUrl: "/images/products/1.jpg",
    ctaLabel: "Start Your Legacy",
    points: [
      {
        title: "One contract, not four",
        body: "When the architect, the engineer, the quantity surveyor and the site team all answer to us, a change is coordinated once. Not priced three times and blamed on whoever isn’t in the room.",
      },
      {
        title: "The approvals are ours to chase",
        body: "County submission, NEMA and every query that comes back. You’re told as each one clears. You’re not sent to follow any of them up.",
      },
      {
        title: "You wait for the handover",
        body: "Foundation to finishing under one site manager, typically six to twelve months for a home. Whether it’s somewhere to live or units to let, the next thing you do is collect the keys.",
      },
    ],
  },

  /**
   * LEVER: Anchoring.
   * SOP 1.3: lead with the strongest number and make it the largest element
   * on the page. "Fixed" carries more weight than "on reducing balance"
   * because it is the part a commercial bank cannot match, and it is what
   * the whole calculator argument rests on. The button sends people to the
   * calculator rather than the form: the question blocking this decision is
   * "what is my monthly", and a visitor who has answered it themselves is a
   * far warmer lead.
   *
   * FIGURES ON THIS PRODUCT ARE LOAD-BEARING. 9.5% fixed, KES 10.5M maximum
   * loan, 25 year maximum term, usable to buy land and build on it, total
   * project ceiling KES 15M including the land. Do not restate any of these
   * from memory.
   */
  {
    id: 2,
    productTitle: "Jenga Kwako",
    badge: "9.5% fixed · up to 25 years",
    productHook: "9.5% fixed. Up to KES 10.5M. Twenty-five years to pay.",
    productVp:
      "Everything in Jenga Stress Free, plus the financing to begin. A KMRC-backed mortgage we prepare, submit and follow through while your drawings and costing are being done. It can buy the plot too, as long as the land and the build together stay under KES 15 million.",
    fileType: "IMAGE",
    fileUrl: "/images/products/2.jpg",
    ctaLabel: "Work Out Your Monthly",
    ctaHref: "#affordability",
    points: [
      {
        title: "Enough to finish, not just to start",
        body: "KES 10.5 million builds a maisonette or a good-sized bungalow. It can buy the plot too, as long as the land and the build together stay under KES 15 million.",
      },
      {
        title: "You can top up the difference",
        body: "Your whole project, land included, can run to KES 15 million. The mortgage covers up to 10.5 of it and you put in the rest.",
      },
      {
        title: "We prepare the application, not you",
        body: "The same end-to-end construction service, with the financing application assembled, submitted and followed through by us rather than left on your desk.",
      },
    ],
  },

  /**
   * LEVER: Costly Signaling (Sutherland).
   * The barrier here is not price, it is the fear of being taken. Money goes
   * home to a contractor, a cousin or a friend and the house never comes up.
   * Trust does not move on claims, so the argument is made out of things
   * that cost us something: recording every stage as it happens, publishing
   * the cost position against the BOQ, and being a registered company that
   * can be held to a contract instead of a person who can go quiet.
   */
  {
    id: 3,
    productTitle: "Diaspora Building Solutions",
    financing: true,
    productHook:
      "You’ve heard the stories. Money sent home, and no house to show for it.",
    productVp:
      "Every stage photographed and dated, every shilling logged against the bill of quantities, on a portal you open from wherever you are. You don’t have to take anyone’s word for it, ours included. You can look.",
    fileType: "IMAGE",
    fileUrl: "/images/products/3.jpg",
    ctaLabel: "Book A Video Consult",
    points: [
      {
        title: "Check it yourself, at any hour",
        body: "Progress photographs, site records and your current cost position against the BOQ go up as the work happens. You can check your site at two in the morning your time without asking anybody for a favour.",
      },
      {
        title: "A company, not an arrangement",
        body: "You’re contracting an NCA-accredited firm with an office you can visit, a contract you can enforce and a bill of quantities we’re measured against. Not an individual with a mobile number.",
      },
      {
        title: "No relative left carrying it",
        body: "Approvals, procurement and supervision are ours. Nobody at home is asked to run your project, and nobody is put in a position to be blamed when something goes wrong.",
      },
    ],
  },

  /**
   * LEVER: Authority.
   * Most of this work is remodelling, not fault-finding: a facelift on a
   * house that is structurally fine. The copy leads on that and keeps the
   * diagnostic discipline as the third point, where it belongs, so the page
   * attracts facelift enquiries rather than leak hunts.
   */
  {
    id: 4,
    productTitle: "Repairs, Renovations & Remodelling",
    productHook: "Your house doesn’t need rebuilding. It needs a facelift.",
    productVp:
      "Cracks made good, worn paintwork, old tiles, a kitchen or bathroom that has had its day. We measure it, price it before anything starts, phase it around you still living there, and hand the place back looking like a different building.",
    fileType: "IMAGE",
    fileUrl: "/images/products/4.jpg",
    ctaLabel: "Book A Site Visit",
    points: [
      {
        title: "A facelift, not a rebuild",
        body: "Paint, tiles, finishes, joinery, cracks made good, a kitchen or bathroom brought up to date. Most of what changes how a house feels is surface work, and it costs a fraction of building again.",
      },
      {
        title: "You keep living in it",
        body: "The work is phased, with dust, noise, access and security planned around you. A house somebody is still living in, or a shop that still has to open, is a different job from an empty site and it gets programmed as one.",
      },
      {
        title: "Priced before we start",
        body: "A written quote off a measured scope, so the budget is agreed at the beginning. And if something structural is sitting behind that crack, you hear it from us before we close it up, not after.",
      },
    ],
  },

  /**
   * LEVER: Reciprocity.
   * The low-commitment entry to the funnel, and the only product that sells
   * purely on trust. Two distinct tracks live here: pre-construction modules
   * bought individually, and project advisory on a build somebody else is
   * running. They are different offers for different people at different
   * moments, so each gets its own point rather than being merged.
   */
  {
    id: 5,
    productTitle: "Building Consultancy",
    productHook:
      "A professional eye, whether you’re planning or already building.",
    productVp:
      "Drawings, a bill of quantities or a feasibility study, each priced on its own and yours to take anywhere. Or an independent eye on a project another contractor is building for you. No obligation to build with us afterwards.",
    fileType: "IMAGE",
    fileUrl: "/images/products/5.jpg",
    ctaLabel: "Book A Consultation",
    points: [
      {
        title: "Before you build",
        body: "Architectural, structural, mechanical and electrical drawings, a bill of quantities, feasibility analysis or project management, available individually. The BOQ is prepared independently, so you can price your own tender against it or sense-check one already in front of you.",
      },
      {
        title: "While someone else builds",
        body: "An independent eye on the work, the valuations and the variations, so you’re not relying on the word of the person you’re paying. We report to you, not to the site.",
      },
      {
        title: "No obligation to build with us",
        body: "Clients often start here and bring us the build later. That’s a good outcome, but it isn’t the condition of the engagement.",
      },
    ],
  },

  /**
   * LEVER: Framing Effect (a copy-led lever, per SOP 1.3).
   * On this product the crew is the product. The client has already decided
   * to buy their own materials, so arguing about the commercial arrangement
   * wins nothing. What they are short of is experienced hands and somebody
   * accountable for what those hands produce.
   */
  {
    id: 6,
    productTitle: "Labour Only",
    productHook: "Fundis who’ve built it before, on your site.",
    productVp:
      "You buy the materials and keep the margin. We bring the crew and the supervision. Masons, steel fixers, carpenters and finishers who have done the work before on sites we have run, with a site manager answerable for what they put up.",
    fileType: "IMAGE",
    fileUrl: "/images/products/6.jpg",
    ctaLabel: "Get A Labour Quote",
    points: [
      {
        title: "A crew that has done it before",
        body: "Masons, steel fixers, carpenters, plumbers and finishers drawn from the teams we run on our own contracts. Trade-tested, used to working off drawings, and used to being inspected.",
      },
      {
        title: "Supervised, not just supplied",
        body: "A site manager runs the programme, the sequencing and the quality control. The labour is the visible part. What protects your money is somebody being accountable for the standard.",
      },
      {
        title: "Told what to buy, and when",
        body: "We specify quantities, materials and delivery timing, so your procurement serves the schedule instead of stalling it or filling your plot with stock far too early.",
      },
    ],
  },
];
