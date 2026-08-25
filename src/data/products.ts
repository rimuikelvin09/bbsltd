import { Product } from "@/types";

/**
 * PRODUCT CATALOGUE
 * -----------------
 * Source of truth for the six routes on the home page, the header
 * dropdown, the footer column and each /products/<slug> page. Slugs
 * generate from productTitle.
 *
 * COPY FRAMEWORK (Creative & Marketing SOP v2.0, Section 1)
 * Hook -> UVP -> CTA, with exactly ONE persuasion lever per product,
 * named in the comment above it. Do not stack levers when editing:
 * per SOP 1.1 depth comes from picking the right lever, not several.
 *
 *   productHook = the Hook. The <h1> on the product page, and the
 *                 largest element on it.
 *   productVp   = the UVP. Shown on the card in the home listing.
 *                 [specific outcome] + [without the usual downside]
 *                 + [because of X].
 *   points      = at most THREE supporting points, below the fold.
 *                 Not bullets -- each renders with a numeral and a
 *                 short heading. Three is the cap on purpose.
 *   ctaLabel    = the single CTA (SOP 1.2). Omit for "Start Your Legacy".
 *
 * IMAGES: drop a photo into /public/images/products/ and set fileUrl.
 * An empty fileUrl renders a marked placeholder rather than breaking.
 */

export const products: Product[] = [
  /**
   * LEVER: Loss Aversion.
   * The competitor is not another contractor -- it is the client
   * deciding to co-ordinate architect, QS, county and fundi themselves.
   */
  {
    id: 1,
    productTitle: "Jenga Stress Free",
    productHook: "Nobody budgets for the months a file sits at the county.",
    productVp:
      "A finished home without you chasing architects, counties and contractors — because all seven stages sit under one accountable contract.",
    fileType: "IMAGE",
    fileUrl: "/images/products/1.jpg",
    ctaLabel: "Start Your Legacy",
    points: [
      {
        title: "One contract, start to finish",
        body: "Design, approvals and construction sit under a single accountable contract — so the gap between consultants never becomes your problem to solve.",
      },
      {
        title: "The county paperwork is ours",
        body: "We submit drawings to the county, manage NEMA approvals and answer regulatory queries on your behalf — the part that quietly costs most projects months.",
      },
      {
        title: "Costed before ground breaks",
        body: "A full Bill of Quantities before construction starts, so the figure you plan around is the figure you build to.",
      },
    ],
  },

  /**
   * LEVER: Anchoring.
   * Switched from Framing once the real terms landed. SOP 1.3: lead with
   * the strongest number and make it the largest element on the page.
   * 9.5% against Kenyan commercial mortgage pricing is that number, so
   * it belongs in the hook rather than buried in a bullet.
   */
  {
    id: 2,
    productTitle: "Jenga Kwako",
    productHook: "9.5% a year, for 25 years, on the plot you already own.",
    productVp:
      "Up to KES 10.5 million to build on land you already hold — without waiting years to save the full amount — through a KMRC-backed mortgage we structure and submit alongside your drawings and BOQ.",
    fileType: "IMAGE",
    fileUrl: "/images/products/2.jpg",
    ctaLabel: "Check If You Qualify",
    points: [
      {
        title: "9.5% on reducing balance",
        body: "Interest is charged on what you still owe rather than what you originally borrowed, so the cost falls every year you pay down.",
      },
      {
        title: "Up to KES 10.5 million, over 25 years",
        body: "Enough to build, spread far enough that repayment tracks a salary rather than a windfall.",
      },
      {
        title: "Your land is the security",
        body: "The plot you already hold is what unlocks the facility — which is why this route exists for people who have somewhere to build and no lump sum.",
      },
    ],
  },

  /**
   * LEVER: Costly Signaling (Sutherland).
   * The dominant emotion is distrust, and claims do not move distrust.
   * Talk about what the oversight costs us to run. Switch to Social
   * Proof once two or three diaspora clients agree to be named.
   */
  {
    id: 3,
    productTitle: "Diaspora Building Solutions",
    productHook: "“It is coming along well” is not a progress report.",
    productVp:
      "A build you can verify from abroad — without a relative supervising on your behalf — because documented reporting is part of how we run the site, not a favour we do on request.",
    fileType: "IMAGE",
    fileUrl: "/images/products/3.jpg",
    ctaLabel: "Book A Video Consult",
    points: [
      {
        title: "Reporting on a schedule, not on request",
        body: "Site photography, written records and your current cost position, issued whether or not you ask for them.",
      },
      {
        title: "One named technical contact",
        body: "The same person accountable for your site throughout, rather than whoever happens to answer the phone that week.",
      },
      {
        title: "Approvals handled locally",
        body: "County and NEMA submissions are made here, so nothing waits on a signature you would have to fly in to give.",
      },
    ],
  },

  /**
   * LEVER: Authority.
   * This buyer has to defend the choice upward, so the copy arms them
   * with credentials and named institutional work.
   */
  {
    id: 4,
    productTitle: "Repairs, Renovations & Remodelling",
    productHook:
      "Renovating an occupied building is not the same job as renovating an empty one.",
    productVp:
      "Upgrades delivered inside live, high-sensitivity buildings — without shutting the operation down — because we plan around occupancy before we plan the works.",
    fileType: "IMAGE",
    fileUrl: "/images/products/4.jpg",
    ctaLabel: "Request A Site Assessment",
    points: [
      {
        title: "Planned around occupancy",
        body: "Phasing is designed around how the building is actually used, so the operation keeps running while the works proceed.",
      },
      {
        title: "Institutional track record",
        body: "Family Bank in Githunguri, Kinyanjui Technical Institute and Mary Hill School, alongside embassies, corporate offices and high-end residences.",
      },
      {
        title: "Services drawn in-house",
        body: "Architectural, structural, mechanical and electrical drawings from our own team — which matters when you are cutting into a live services run.",
      },
    ],
  },

  /**
   * LEVER: Reciprocity.
   * The low-commitment door into the funnel, so any pressure defeats
   * its purpose. Give first, then remove the obligation explicitly.
   */
  {
    id: 5,
    productTitle: "Building Consultancy",
    productHook: "You do not have to hand us the build to use what we know.",
    productVp:
      "The one piece you actually need — drawings, a BOQ, feasibility or project management — without handing over the whole project, because every service is available unbundled.",
    fileType: "IMAGE",
    fileUrl: "/images/products/5.jpg",
    ctaLabel: "Book A Consultation",
    points: [
      {
        title: "Take one service, not the project",
        body: "Drawings, a Bill of Quantities, feasibility analysis or project management — available individually and priced individually.",
      },
      {
        title: "A BOQ you can check a tender against",
        body: "Prepared independently, so you can price a tender of your own or sense-check one you have been handed.",
      },
      {
        title: "No obligation to build with us",
        body: "Clients often start here and bring us the build later. That is a good outcome, not the condition of the engagement.",
      },
    ],
  },

  /**
   * LEVER: Social Proof.
   * Muthaiga View Place was a genuine labour-only contract with hard
   * numbers, which makes this lever available here and nowhere else.
   */
  {
    id: 6,
    productTitle: "Labour Only",
    productHook:
      "Aberdare Investments bought the materials themselves. We built the 24 units.",
    productVp:
      "You keep control of procurement while we supply the labour, supervision and technical direction — so buying your own materials never means supervising your own site.",
    fileType: "IMAGE",
    fileUrl: "/images/products/6.jpg",
    ctaLabel: "Get A Labour Quote",
    points: [
      {
        title: "Muthaiga View Place, 24 units",
        body: "Delivered for Aberdare Investments on a labour-only contract: 24 two-bedroom units, 6 shops and 28 parking lots.",
      },
      {
        title: "Supervision is the product",
        body: "Our technical director leads over 300 personnel across live sites. You are buying that oversight, not just hands.",
      },
      {
        title: "You buy, we schedule",
        body: "You control procurement while we specify what to buy, in what quantity, and when it needs to be on site.",
      },
    ],
  },
];
