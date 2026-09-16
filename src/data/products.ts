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
 *                 instead of opening the enquiry form - used where there is
 *                 a tool on the page that should come first.
 *
 * WHY THE HOOKS WERE REWRITTEN (Sept 2026)
 * The previous set was written from inside the business. "Most delays start
 * between your consultants" assumes the reader already has consultants and
 * already frames their problem as coordination failure; "A quick fix is just
 * a slower problem" is an aphorism rather than a situation. Users said the
 * copy was not landing, and this is why: it described what we know about the
 * market instead of what the reader arrived worrying about.
 *
 * Each hook is now the reader's own position, in the second person, and each
 * still carries a single lever. The supporting points were mostly kept -
 * they were already concrete - but retitled where the title was our framing
 * rather than the reader's question.
 *
 * NO NAMED CLIENTS OR PROJECTS. The copy sells the service on its own terms.
 *
 * ON FIGURES: the only hard numbers used are ones we can stand behind - the
 * KMRC mortgage terms, our accreditation and headcount, and the 6-12 month
 * residential duration already published in our own FAQ. Where a market
 * statistic would strengthen a hook it is deliberately absent rather than
 * invented; supply a sourced figure and it can go in. Per-square-metre rates
 * and price ranges are the obvious gap: they are what people search for, and
 * adding them would be the single biggest copy improvement left.
 */

export const products: Product[] = [
  /**
   * LEVER: Loss Aversion.
   * What they stand to lose is not money first - it is their own time and
   * attention, every week, for a year. The hook names that.
   */
  {
    id: 1,
    productTitle: "Jenga Stress Free",
    productHook: "You should not have to project-manage your own house.",
    productVp:
      "Architect, engineer, quantity surveyor and site team on one contract with us — so drawings, county approvals and the build are one job with one person answerable, instead of four you have to hold together yourself.",
    fileType: "IMAGE",
    fileUrl: "/images/products/1.jpg",
    ctaLabel: "Start Your Legacy",
    points: [
      {
        title: "One contract, not four",
        body: "When the architect, the engineer, the quantity surveyor and the site team all answer to us, a change is coordinated once — instead of priced three times and blamed on whoever is not in the room.",
      },
      {
        title: "The approvals are ours to chase",
        body: "County submission, NEMA and every query that comes back. You are told as each one clears. You are not sent to follow any of them up.",
      },
      {
        title: "You wait for the handover",
        body: "Foundation to finishing under one site manager — typically six to twelve months for a home. Whether it is somewhere to live or units to let, the next thing you do is collect the keys.",
      },
    ],
  },

  /**
   * LEVER: Anchoring.
   * SOP 1.3: lead with the strongest number and make it the largest element
   * on the page. The button now sends people to the calculator rather than
   * the form: the question blocking this decision is "what is my monthly",
   * and a visitor who has answered it themselves is a far warmer lead.
   */
  {
    id: 2,
    productTitle: "Jenga Kwako",
    productHook:
      "9.5% on reducing balance. Up to KES 10.5M. Twenty-five years to pay.",
    productVp:
      "Everything in Jenga Stress Free, plus the financing to begin — a KMRC-backed mortgage we prepare, submit and follow through while your drawings and costing are being done. It can cover the plot too, if the total stays inside the limit.",
    fileType: "IMAGE",
    fileUrl: "/images/products/2.jpg",
    ctaLabel: "Work Out Your Monthly",
    ctaHref: "#affordability",
    points: [
      {
        title: "Enough to finish, not just to start",
        body: "KES 10.5 million builds a maisonette or a spacious bungalow — and it can cover buying the plot as well, provided the total stays inside the limit.",
      },
      {
        title: "Building above the cap still qualifies",
        body: "If your project runs up to KES 20 million you can still take the mortgage and top up the difference yourself.",
      },
      {
        title: "We prepare the application, not you",
        body: "The same end-to-end construction service, with the financing application assembled, submitted and followed through by us rather than left on your desk.",
      },
    ],
  },

  /**
   * LEVER: Costly Signaling (Sutherland).
   * The barrier is trust, and trust does not move on claims. What moves it is
   * visible, expensive infrastructure: recording every stage as it happens
   * costs us something, and that cost is the argument.
   */
  {
    id: 3,
    productTitle: "Diaspora Building Solutions",
    productHook: "Send money, then hope. That is the usual arrangement.",
    productVp:
      "Every stage photographed and dated, every shilling logged against the bill of quantities, on a portal you open from wherever you are — so checking your site is something you do, not something you ask for.",
    fileType: "IMAGE",
    fileUrl: "/images/products/3.jpg",
    ctaLabel: "Book A Video Consult",
    points: [
      {
        title: "Verify instead of trusting",
        body: "Progress, records and your current cost position go up as the work happens. You can look at two in the morning your time without asking anyone a favour.",
      },
      {
        title: "No relative left carrying it",
        body: "Approvals, procurement and supervision are ours. Nobody at home is asked to run your project, and nobody is put in a position to be blamed for it.",
      },
      {
        title: "The full service, run at distance",
        body: "Design, approvals, costing and construction exactly as they run locally, with the oversight layer built around the fact that you are not there.",
      },
    ],
  },

  /**
   * LEVER: Authority.
   * This buyer is usually accountable to someone else for the decision, so
   * the copy has to arm them: diagnosis over patching, and the discipline of
   * working inside a building that cannot close.
   */
  {
    id: 4,
    productTitle: "Repairs, Renovations & Remodelling",
    productHook: "The third time you fix the same leak, it was never the leak.",
    productVp:
      "We establish why it failed before we close it up, and we plan the work around your opening hours, your staff and your security — so the building keeps running while we are inside it.",
    fileType: "IMAGE",
    fileUrl: "/images/products/4.jpg",
    ctaLabel: "Request A Site Assessment",
    points: [
      {
        title: "Repaired at the cause",
        body: "We establish why the failure happened before we close it up. Patching the symptom is cheaper on the day and more expensive every season after it.",
      },
      {
        title: "Your building keeps working",
        body: "Phasing, dust and noise control, access and security are planned around occupancy — because a space that has to keep operating is a different job from an empty one.",
      },
      {
        title: "Handed back ready to use",
        body: "Trades are supervised to the same standard as a new build, and the space comes back clean rather than ready to tidy.",
      },
    ],
  },

  /**
   * LEVER: Reciprocity.
   * The low-commitment entry to the funnel. Any pressure here defeats the
   * point, so the copy gives first and removes the obligation explicitly.
   */
  {
    id: 5,
    productTitle: "Building Consultancy",
    productHook: "Take the drawings. Leave the rest.",
    productVp:
      "Architectural, structural and MEP drawings, a bill of quantities, a feasibility study or project management — each priced on its own, each yours to take elsewhere. No obligation to build with us afterwards.",
    fileType: "IMAGE",
    fileUrl: "/images/products/5.jpg",
    ctaLabel: "Book A Consultation",
    points: [
      {
        title: "One service, not the project",
        body: "Architectural, structural, mechanical and electrical drawings, a bill of quantities, feasibility analysis or project management — available individually.",
      },
      {
        title: "A BOQ you can hold a tender against",
        body: "Prepared independently, so you can price your own tender or sense-check one that has already been put in front of you.",
      },
      {
        title: "No obligation to build with us",
        body: "Clients often start here and bring us the build later. That is a good outcome, but it is not the condition of the engagement.",
      },
    ],
  },

  /**
   * LEVER: Framing Effect (a copy-led lever, per SOP 1.3).
   * The old hook told this client their plan was the naive part. The reframe
   * works better when it validates the decision they have already made and
   * moves the argument to what they are actually short of: supervision.
   */
  {
    id: 6,
    productTitle: "Labour Only",
    productHook: "Keep the procurement. Hand over the site.",
    productVp:
      "You buy the materials and keep the margin. We bring the supervision, the sequencing and the technical direction — so owning the cement never turns into running the site.",
    fileType: "IMAGE",
    fileUrl: "/images/products/6.jpg",
    ctaLabel: "Get A Labour Quote",
    points: [
      {
        title: "What you are actually buying is supervision",
        body: "The labour is the visible part. What protects your money is a site run to programme, to specification and to a standard somebody is accountable for.",
      },
      {
        title: "Told what to buy, and when",
        body: "We specify quantities, materials and delivery timing, so your procurement serves the schedule instead of stalling it or filling your plot with stock too early.",
      },
      {
        title: "The same standard as a full contract",
        body: "Workmanship, sequencing and quality control do not drop because you supplied the materials yourself.",
      },
    ],
  },
];
