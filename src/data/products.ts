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
 *                 Kept short enough to take in at a glance: it names the
 *                 problem, it does not explain the service.
 *   productVp   = the UVP. Shown on the card in the home listing.
 *                 [specific outcome] + [without the usual downside]
 *                 + [because of X].
 *   points      = at most THREE supporting points, below the fold.
 *   ctaLabel    = the single CTA (SOP 1.2). Omit for "Start Your Legacy".
 *
 * NO NAMED CLIENTS OR PROJECTS. The copy sells the service on its own terms.
 *
 * On figures: the only hard numbers used are ones we can stand behind — the
 * KMRC mortgage terms, and our own accreditation and headcount. Where a
 * market statistic would strengthen a hook, it is deliberately absent rather
 * than invented; supply a sourced figure and it can go in.
 */

export const products: Product[] = [
  /**
   * LEVER: Loss Aversion.
   * The competitor is not another contractor. It is the client appointing an
   * architect from one firm, a QS from another and a contractor from a third,
   * then absorbing the cost of every disagreement between them.
   */
  {
    id: 1,
    productTitle: "Jenga Stress Free",
    productHook: "Most delays start between your consultants, not on your site.",
    productVp:
      "Design, approvals and construction under one contract — architect, engineer, quantity surveyor and site team accountable to the same people — so a change is a conversation, not a renegotiation. Plot to home, or plot to income.",
    fileType: "IMAGE",
    fileUrl: "/images/products/1.jpg",
    ctaLabel: "Start Your Legacy",
    points: [
      {
        title: "One team, not four firms",
        body: "When the architect, the engineer, the quantity surveyor and the site team answer to one contract, a revision is coordinated once — instead of priced three times and blamed on whoever is not in the room.",
      },
      {
        title: "Approvals handled and documented",
        body: "County submissions, NEMA and every regulatory query are ours to carry, with records kept in order so your file never stalls waiting on a document nobody can find.",
      },
      {
        title: "You wait for the handover",
        body: "Foundation to finishing under a single manager. Whether it is a home to live in or a property to earn from, the next thing you do is collect the keys.",
      },
    ],
  },

  /**
   * LEVER: Anchoring.
   * SOP 1.3: lead with the strongest number and make it the largest element
   * on the page. Against commercial mortgage pricing in Kenya, 9.5% on
   * reducing balance is that number, so it is the hook rather than a bullet.
   */
  {
    id: 2,
    productTitle: "Jenga Kwako",
    productHook: "9.5%. Up to KES 10.5M. Twenty-five years.",
    productVp:
      "Everything in Jenga Stress Free, plus the financing to begin — a KMRC-backed mortgage at 9.5% on reducing balance, which we arrange and carry through alongside your drawings and costing.",
    fileType: "IMAGE",
    fileUrl: "/images/products/2.jpg",
    ctaLabel: "Check If You Qualify",
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
        title: "We build it and we bank it",
        body: "The same end-to-end construction service, with the financing application prepared, submitted and followed through by us rather than left to you.",
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
    productHook: "Everyone knows someone whose money vanished into a site.",
    productVp:
      "A build you can audit from anywhere — every stage recorded and every shilling accounted for on a system designed so you never have to take our word for it. Plot to home, or plot to income.",
    fileType: "IMAGE",
    fileUrl: "/images/products/3.jpg",
    ctaLabel: "Book A Video Consult",
    points: [
      {
        title: "Verify rather than trust",
        body: "Progress, records and your current cost position are logged as the work happens, so checking your project is something you do whenever you like — not a favour you have to ask for.",
      },
      {
        title: "No relative left holding it",
        body: "Approvals, procurement and supervision are ours. Nobody at home is asked to carry your project, and no one is put in a position to be blamed for it.",
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
   * the copy has to arm them: expertise, method, and the discipline of
   * working inside a building that cannot close.
   */
  {
    id: 4,
    productTitle: "Repairs, Renovations & Remodelling",
    productHook: "A quick fix is just a slower problem.",
    productVp:
      "Repairs and remodels done to last, inside buildings that stay open — planned around your people, your security and your operating hours before a single tool arrives.",
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
        title: "Finished, not just completed",
        body: "Trades are supervised to the same standard as a new build, and the space is handed back clean and ready to use rather than ready to tidy.",
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
    productHook: "You may not need a contractor yet.",
    productVp:
      "Drawings, a bill of quantities, feasibility or project management — taken one at a time and priced one at a time, with no obligation to build with us afterwards.",
    fileType: "IMAGE",
    fileUrl: "/images/products/5.jpg",
    ctaLabel: "Book A Consultation",
    points: [
      {
        title: "Take one service, not the project",
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
   * This client thinks they are buying labour. Reframing what they are
   * actually paying for -- supervision -- is the whole argument.
   */
  {
    id: 6,
    productTitle: "Labour Only",
    productHook: "Buying your own materials is the easy part.",
    productVp:
      "You keep control of procurement while we bring the supervision, sequencing and technical direction — so owning the materials never turns into running the site.",
    fileType: "IMAGE",
    fileUrl: "/images/products/6.jpg",
    ctaLabel: "Get A Labour Quote",
    points: [
      {
        title: "What you are buying is supervision",
        body: "The labour is the visible part. What actually protects your money is a site run to programme, to specification and to a standard somebody is accountable for.",
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
