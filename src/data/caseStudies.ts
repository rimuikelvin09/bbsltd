/**
 * CASE STUDIES - THE CONTENT MODEL
 * =================================
 *
 * THE PROBLEM THIS SOLVES. We do not have one kind of project. There are
 * completed apartment blocks, Jenga Kwako builds, projects still under
 * construction, repair and refurbishment jobs, and commissions where we only
 * ever produced drawings. The naive answer is a `type` field and a different
 * page layout per type, which is six templates to maintain that drift apart
 * within a year.
 *
 * THE ANSWER IS TO SEPARATE THREE THINGS that are usually conflated:
 *
 *   1. STATUS     - is it finished? Drives one honest badge, nothing else.
 *   2. HERO PROOF - what can this project actually PROVE in two seconds?
 *   3. CHAPTERS   - an ORDERED ARRAY, not a fixed seven. A design-only job
 *                   has no "Result"; a repair has no "Design".
 *
 * Every case study renders through ONE page template. All the variation is
 * data, plus a single discriminated union on the hero.
 *
 * THE KEY INSIGHT IS THE COMPARISON FRAME. One component serves three of our
 * categories, because the only thing that changes is the pair of labels:
 *
 *   completed build  -> "Drawn"  / "Built"
 *   under construction -> "Drawn"  / "As at March 2026"
 *   repair / refurb  -> "Before" / "After"
 *
 * That is the whole trick. A project in progress is not a worse case study
 * than a finished one; it is the same comparison told honestly, and the
 * dated label is MORE compelling than a vague one because it proves the
 * photograph is current.
 *
 * AND WHERE NO COMPARISON EXISTS, WE DO NOT FAKE ONE. A drawings-only
 * commission gets `hero.kind = "gallery"` and shows the drawings as drawings.
 * Presenting a render as though it were a photograph is exactly the trust
 * problem the rest of the site argues against.
 */

export type CaseStatus = "complete" | "in-progress" | "design-stage";

export type CaseCategory =
  | "apartment"
  | "maisonette"
  | "commercial"
  | "institutional"
  | "repair"
  | "design"
  | "financed";

/** What a picture IS. Drives its label, never its styling. */
export type MediaKind = "photo" | "drawing" | "diagram" | "render";

/**
 * Chapter keys are the story beats available to any project. A case study
 * picks the ones it actually has, in the order it wants them. The key drives
 * the default heading-kicker and the image filename prefix - nothing else.
 */
export type ChapterKey =
  | "brief"
  | "site"
  | "design"
  | "problem"
  | "solution"
  | "challenges"
  | "progress"
  | "result"
  | "handover"
  | "scope";

export interface CaseChapter {
  key: ChapterKey;
  /** Shown in the mono kicker, e.g. "THE BRIEF". Defaults from the key. */
  kicker?: string;
  title: string;
  /** One paragraph per entry. A `pull` entry renders as a pull quote. */
  body: string[];
  pull?: string;
  /** One-line summary shown under the gallery while this chapter is live. */
  caption: string;
  /**
   * Images for this chapter. The LENGTH of this array is how many of the
   * numbered files in the case folder it consumes, so declaring a slot
   * reserves the next picture in sequence. A slot with no file yet renders
   * as a captioned panel rather than a gap.
   *
   * A chapter with NO media is fine and common - the gallery simply holds
   * whatever is already on screen while the reader goes through a passage
   * that has no picture of its own.
   */
  media?: { caption: string; kind: MediaKind }[];
}

/**
 * THE HERO PROOF DEVICE. A discriminated union rather than a set of optional
 * fields, so it is impossible to configure a comparison with only one image.
 */
export type HeroProof =
  | {
      kind: "compare";
      /** Image basenames inside the case folder, without extension. */
      left: string;
      right: string;
      leftLabel: string;
      rightLabel: string;
      leftKind: MediaKind;
      rightKind: MediaKind;
    }
  /**
   * TWO IMAGES SIDE BY SIDE, each captioned. Use this - not `compare` -
   * whenever the two pictures were not taken from the same position. A
   * slider between mismatched viewpoints reads as a bait-and-switch, which
   * on a page arguing for our honesty is the worst available failure.
   */
  | {
      kind: "pair";
      left: string;
      right: string;
      leftLabel: string;
      rightLabel: string;
      leftKind: MediaKind;
      rightKind: MediaKind;
      leftCaption: string;
      rightCaption: string;
    }
  | { kind: "gallery"; images: string[]; kinds: MediaKind[] }
  | { kind: "single"; image: string; imageKind: MediaKind };

export interface SpecGroup {
  heading: string;
  rows: { term: string; value: string }[];
}

export interface CaseStudy {
  slug: string;
  /** Display number. "01" reads better than 1 in the eyebrow. */
  index: string;
  category: CaseCategory;
  status: CaseStatus;
  /**
   * The folder under public/images/projects/ holding this study's images.
   * Deliberately INDEPENDENT of the slug: the URL can be renamed for SEO
   * without anybody having to move a folder of photographs.
   */
  imageFolder: string;

  title: string;
  /** The <h1>. Short, and it should state the outcome if there is one. */
  headline: string;
  /** The landing-card bullets. Four at most - they are scanned, not read. */
  talkingPoints: string[];
  /** Used for <meta description> and the card. One sentence. */
  summary: string;

  /** Rendered as a plain factual badge. Never an apology. */
  statusNote: string;
  location: string;
  /** ISO date or year. Used in metadata and the spec block. */
  completed?: string;

  hero: HeroProof;
  /** The section heading above the narrative. */
  narrativeEyebrow: string;
  narrativeHeading: string;
  narrativeLede?: string;
  chapters: CaseChapter[];
  spec: SpecGroup[];

  /** Shown above the enquiry form. Speaks to the reader's own situation. */
  askHeading: string;
  askBody: string;
  draft?: boolean;
}

/** Default kickers. A chapter can override with its own `kicker`. */
export const CHAPTER_KICKERS: Record<ChapterKey, string> = {
  brief: "THE BRIEF",
  site: "WHAT THE SITE TOLD US",
  design: "THE DESIGN",
  problem: "THE PROBLEM",
  solution: "WHAT WE DID",
  challenges: "WHAT WENT WRONG",
  progress: "WHERE IT STANDS",
  result: "THE RESULT",
  handover: "HANDOVER",
  scope: "OUR SCOPE",
};

export const CATEGORY_LABELS: Record<CaseCategory, string> = {
  apartment: "Plot to income",
  maisonette: "Plot to own",
  commercial: "Commercial",
  institutional: "Institutional",
  repair: "Repair and refurbishment",
  design: "Design commission",
  financed: "Jenga Kwako",
};

export const STATUS_LABELS: Record<CaseStatus, string> = {
  complete: "Completed",
  "in-progress": "In progress",
  "design-stage": "Design stage",
};

/* ====================================================================== */

export const caseStudies: CaseStudy[] = [
  {
    slug: "kinoo-apartments",
    index: "01",
    category: "apartment",
    status: "complete",
    imageFolder: "case01",
    /**
     * HELD BACK, not unfinished. The page, the images and the copy are all
     * done. It needs the client's written consent to publish - she is
     * identifiable from it - and the floor and unit counts reconciled
     * against the photographs. Remove this line to ship it.
     */
    draft: true,

    title: "Two Bedroom Apartments, Kinoo",
    headline: "Two floors now, five later.",
    summary:
      "A retired civil servant in Mombasa owned two plots in Kinoo and savings that reached a fraction of the building they deserved. We built the fraction that pays for the rest.",
    talkingPoints: [
      "Retired client in Mombasa, land in Kiambu, no appetite for commuting",
      "Budget covered two floors of a five-floor design",
      "Phased around income, not around construction convenience",
      "Phase 1 complete and fully let",
    ],

    statusNote: "Phase 1 complete and occupied. Phase 2 to follow.",
    location: "Kinoo, Kiambu County",
    completed: "2025",

    /**
     * SLIDER, by Kelvin's call - the interactive device is being piloted on
     * this study deliberately.
     *
     * NOTE THE LABELS. The left image is a RENDER of the full five-floor
     * scheme on an idealised plot; the right is a photograph of phase 1 in
     * its real, dense setting. They do not share a viewpoint, so the labels
     * say "As designed" and "Phase 1, built" rather than "Drawn"/"Built" -
     * the slider then reads as a design-against-reality comparison, which is
     * true, instead of implying the camera stood where the render did.
     *
     * The `pair` variant stays in the union for the next study where the two
     * images genuinely cannot be slid across each other.
     */
    hero: {
      kind: "compare",
      left: "hero-drawn",
      right: "hero-built",
      leftLabel: "As designed",
      rightLabel: "Phase 1, built",
      leftKind: "render",
      rightKind: "photo",
    },

    narrativeEyebrow: "How it went",
    narrativeHeading: "The problem was never the building. It was the budget.",
    narrativeLede:
      "We spent as long on the phasing as on the drawings, because the phasing is what made the project possible at all.",

    chapters: [
      {
        key: "brief",
        title: "She wanted a legacy, not a second job.",
        caption: "Before work started",
        body: [
          "A retired civil servant, living in Mombasa, owned two 50x100 plots in Kinoo. She wanted to turn her savings into something that would outlive her and keep supporting her children after she was gone.",
          "What she did not want was to spend her retirement on the road to Nairobi, checking whether the week's work had actually happened. The entire commission rested on one condition: somebody she could trust to run it without her standing over it.",
        ],
      },
      {
        key: "site",
        title: "We priced the tenants before we drew the building.",
        caption: "Site and rental market",
        body: [
          "Two 50x100 plots, a few metres off Waiyaki Way - close enough for tenants to reach town, far enough off it to sleep.",
          "Before anything was drawn we surveyed what the area was actually letting for. Two-bedroom units aimed at families were going between KES 25,000 and 45,000 a month. That range decided the unit type.",
        ],
        pull:
          "The rental market set the design brief. Not the architect, and not the client's preference.",
        media: [{ caption: "Ground-floor columns up, the plot still raw. Small site, neighbours close on three sides \u2014 which is what the design had to work around.", kind: "photo" }],
      },
      {
        key: "design",
        title: "Forty units at full build, across two mirrored blocks.",
        caption: "The design, drawn",
        body: [
          "Five floors, four units to a floor, parking in the basement - twenty units on the first plot, with the same block mirrored onto the second.",
          "Two-bedroom throughout, sized for families rather than squeezed to whatever made the floor plan look efficient. A unit that lets for 45,000 and keeps its tenant for four years beats one that lets for 50,000 and turns over every eight months.",
        ],
      },
      {
        key: "problem",
        title: "The budget reached two floors of one block.",
        caption: "Where the money ran out",
        body: [
          "This is the most common moment in Kenyan development, and the one that kills the most projects: a design that is right for the land and wrong for the bank balance.",
          "There are two usual responses. Shrink the design until it fits the money, which permanently wastes the plot. Or start the full build and stall when the money runs out, which leaves a frame standing in the rain earning nothing while it deteriorates. Both destroy value, and both are extremely common.",
        ],
      },
      {
        key: "solution",
        kicker: "WHAT WE DID INSTEAD",
        title: "We phased it around income, not around construction.",
        caption: "Phased around income",
        body: [
          "Phase 1 is the first two floors of block one: eight complete, lettable units with their own services and their own entrance - not a half-finished frame waiting for more money.",
          "The structure was designed and built for five floors from day one, so phase 2 adds floors to a building that is already earning rather than starting a new argument with an engineer.",
        ],
        pull:
          "At area rents, eight occupied two-beds put roughly KES 200,000 to 360,000 a month into the project. That is the difference between a stalled site and a self-funding one.",
        media: [{ caption: "First slab formwork over the open ground floor. Phase 1 going up as complete units, not a frame left standing.", kind: "photo" }],
      },
      {
        key: "challenges",
        title: "It reached us. It did not reach her.",
        caption: "What went wrong",
        body: [
          "Two things went wrong, and neither is unusual: people presenting themselves as officials from regulatory bodies, looking for a reason to stop work; and suppliers delivering late.",
          "Neither became her problem. Not because we hid them - because the paperwork was already in order before anybody asked to see it, and every exchange was documented and traceable. An approval you can produce on the spot ends that conversation in about a minute.",
        ],
        pull:
          "The same files that keep a client informed are the ones that make you difficult to extort.",
        media: [{ caption: "Walling up to roof level. Work carried on through the delays without the client being drawn into any of it.", kind: "photo" }],
      },
      {
        key: "result",
        title: "Phase 1 complete. Eight units, fully occupied.",
        caption: "Phase 1, occupied",
        body: [
          "She has not had to move from Mombasa, and she has not had to spend her retirement supervising a building site.",
          "Phase 2 will be built on what the building earns rather than on what is left of her savings - which was the whole point of phasing it this way.",
        ],
        media: [{ caption: "Phase 1 finished and painted, compound walled, tanks up.", kind: "photo" }],
      },
    ],

    spec: [
      {
        heading: "Site and plot",
        rows: [
          { term: "Location", value: "Kinoo, Kiambu County" },
          { term: "Plots", value: "2 x 50x100 ft" },
          { term: "Context", value: "A few metres off Waiyaki Way" },
          { term: "Area rent, 2-bed", value: "KES 25,000 - 45,000 / month" },
        ],
      },
      {
        heading: "Design at full build",
        rows: [
          { term: "Blocks", value: "2, mirrored" },
          { term: "Floors", value: "5 per block" },
          { term: "Units per floor", value: "4" },
          { term: "Total units", value: "40" },
          { term: "Unit type", value: "2-bedroom, family" },
          { term: "Parking", value: "Basement" },
        ],
      },
      {
        heading: "Phase 1, as built",
        rows: [
          { term: "Floors built", value: "2 of 5, block one" },
          { term: "Units delivered", value: "8" },
          { term: "Occupancy", value: "100%" },
          { term: "Programme", value: "[CONFIRM] months" },
        ],
      },
    ],

    askHeading: "Is this close to your situation?",
    askBody:
      "If you have a plot and a budget that does not reach the building you want on it, that is the conversation we have most often. Ask here and it comes to us tagged to this project, so you are not starting from the beginning.",
  },

  /* ---------------------------------------------------------------------
   * CASE 02 - PLACEHOLDER. draft:true, so it renders on localhost and is
   * excluded from a production build. Replace the copy with the real
   * commission before removing the flag.
   *
   * IT EXISTS TO PROVE THE HARDEST PATH: a commission where nothing was
   * ever built, so there is no photograph and no comparison to make. The
   * hero becomes a grid of drawings and says so. We do not dress a render
   * up as a finished building - that is the exact trust problem the rest
   * of the site argues against, and committing it on the proof page would
   * be absurd.
   * ------------------------------------------------------------------- */
  {
    slug: "kikuyu-maisonette-design",
    index: "02",
    category: "design",
    status: "design-stage",
    imageFolder: "case02",
    draft: true,

    title: "Four-Bedroom Maisonette, Kikuyu",
    headline: "Drawings he could build from without us.",
    summary:
      "A client who intended to build it himself, in stages, with his own fundi. We did the design and the approvals and stopped there - on purpose.",
    talkingPoints: [
      "Client self-building in stages over roughly three years",
      "Wanted drawings and approvals he could trust, not a contractor",
      "We costed the build anyway, so he knew what he was committing to",
      "Design and approvals issued; the construction is his own",
    ],

    statusNote: "Design and approvals issued. Construction is the client's own.",
    location: "Kikuyu, Kiambu County",

    hero: {
      kind: "gallery",
      images: ["hero-elevation", "hero-ground", "hero-first", "hero-site"],
      kinds: ["drawing", "drawing", "drawing", "drawing"],
    },

    narrativeEyebrow: "How it went",
    narrativeHeading: "He did not want a contractor. He wanted to stop guessing.",
    narrativeLede:
      "Not every commission ends with us on site, and pretending otherwise costs more work than it wins.",

    chapters: [
      {
        key: "brief",
        title: "He had the land, the time and a fundi he trusted.",
        caption: "The brief",
        body: [
          "A client in Kikuyu with a 50x100 plot, a brother-in-law who had built two houses, and no intention of handing the whole thing to a contractor. What he did not have was drawings he could rely on or any idea what the finished house would cost.",
          "He had already been given a set of plans by somebody else. They would not have passed county approval, and he had paid for them.",
        ],
        media: [
          { caption: "The plot as found", kind: "photo" },
          { caption: "The drawings he arrived with", kind: "drawing" },
        ],
      },
      {
        key: "site",
        title: "The slope decided the floor levels.",
        caption: "The site",
        body: [
          "A fall of just over two metres across the plot, which on a four-bedroom maisonette is the difference between a split-level that works and a retaining wall nobody budgeted for.",
          "We surveyed it properly before drawing anything, which is the step the first set of plans had skipped.",
        ],
        media: [
          { caption: "Levels across the plot", kind: "photo" },
          { caption: "The fall, looking down the site", kind: "photo" },
        ],
      },
      {
        key: "design",
        title: "Four bedrooms, a split level, and no retaining wall.",
        caption: "The design",
        body: [
          "The house steps with the ground rather than fighting it. Living and kitchen on the lower level, bedrooms above, with the garage tucked under the upper floor on the high side.",
          "Drawn to be built in stages, because he is building in stages: the shell and the ground floor are usable long before the upper bedrooms are finished.",
        ],
        media: [
          { caption: "Front elevation", kind: "drawing" },
          { caption: "Ground floor plan", kind: "drawing" },
          { caption: "First floor plan", kind: "drawing" },
          { caption: "Site plan with levels", kind: "drawing" },
        ],
      },
      {
        key: "scope",
        kicker: "WHAT WE HANDED OVER",
        title: "Everything he needs, and our number if he wants it.",
        caption: "What was issued",
        body: [
          "Architectural and structural drawings, county approval, NEMA where it applied, and a bill of quantities so he can price materials against something real rather than against what a hardware tells him.",
          "We quoted the build as well. He has not taken it, and that is fine - a client who comes back in two years because the drawings were honest is worth more than one talked into a contract today.",
        ],
        pull:
          "Not every commission should end with us on site. Pretending otherwise costs more work than it wins.",
        media: [
          { caption: "The issued drawing set", kind: "drawing" },
        ],
      },
    ],

    spec: [
      {
        heading: "Site and plot",
        rows: [
          { term: "Location", value: "Kikuyu, Kiambu County" },
          { term: "Plot", value: "50x100 ft" },
          { term: "Fall across site", value: "Approx. 2.1 m" },
        ],
      },
      {
        heading: "The design",
        rows: [
          { term: "Type", value: "Four-bedroom maisonette" },
          { term: "Levels", value: "Split, two storeys" },
          { term: "Parking", value: "Integral, under upper floor" },
        ],
      },
      {
        heading: "Our scope",
        rows: [
          { term: "Services", value: "Design, approvals, bill of quantities" },
          { term: "Construction", value: "Client's own" },
          { term: "Approvals", value: "County, NEMA" },
        ],
      },
    ],

    askHeading: "Do you just need the drawings?",
    askBody:
      "If you are planning to build it yourself and you want a set of drawings and approvals you can rely on, that is a commission on its own. We will cost the build too, so you know what you are taking on - and you are under no obligation to give it to us.",
  },

  /* ---------------------------------------------------------------------
   * CASE 03 - PLACEHOLDER. draft:true.
   *
   * IT EXISTS TO PROVE THE SECOND AWKWARD PATH: a project that is not
   * finished. The comparison frame is unchanged - only the right-hand
   * LABEL changes, from "Built" to a date. A dated label is more
   * convincing than a vague one, because it proves the photograph is
   * current rather than flattering, and the status badge on the card says
   * the same thing before anybody clicks.
   * ------------------------------------------------------------------- */
  {
    slug: "ruiru-warehouse",
    index: "03",
    category: "commercial",
    status: "in-progress",
    imageFolder: "case03",
    draft: true,

    title: "Light Industrial Warehouse, Ruiru",
    headline: "A date on a lease, and ten months to meet it.",
    summary:
      "A distributor's lease ran out in October. The warehouse replacing it had to be operational before then, which made the programme the design brief rather than an afterthought.",
    talkingPoints: [
      "An expiring lease set the date, and the date set everything else",
      "Steel portal frame chosen for programme, not for cost",
      "Office block decoupled so the shed could be occupied first",
      "Frame complete; cladding from November",
    ],

    statusNote: "In progress - steel frame complete, cladding from November 2026.",
    location: "Ruiru, Kiambu County",

    hero: {
      kind: "compare",
      left: "hero-drawn",
      right: "hero-progress",
      leftLabel: "Drawn",
      rightLabel: "As at October 2026",
      leftKind: "drawing",
      rightKind: "photo",
    },

    narrativeEyebrow: "How it is going",
    narrativeHeading: "When the date is fixed, the date is the brief.",
    narrativeLede:
      "Most commercial projects have a deadline somebody invented. This one had a deadline somebody had signed.",

    chapters: [
      {
        key: "brief",
        title: "The old lease expires whether or not we are ready.",
        caption: "The brief",
        body: [
          "A distributor operating out of rented space in Industrial Area, with a lease running to October and a landlord who had already found the next tenant. They had bought land in Ruiru and needed a building on it that worked.",
          "Everything in the project ran off that one date. A warehouse delivered two months late is not a warehouse delivered late - it is storage rented twice and stock moved twice.",
        ],
        media: [
          { caption: "The site before work", kind: "photo" },
          { caption: "The plot boundary and access", kind: "photo" },
        ],
      },
      {
        key: "site",
        title: "Access mattered more than acreage.",
        caption: "The site",
        body: [
          "Just under an acre, but the thing that decided the layout was the turning circle: a container lorry has to get in, reverse square to the loading bay and get out without a three-point turn.",
          "That constraint set the building's position on the plot before a single dimension of the shed was drawn.",
        ],
        media: [
          { caption: "Access from the road", kind: "photo" },
          { caption: "Turning-circle study", kind: "diagram" },
        ],
      },
      {
        key: "design",
        title: "A steel portal frame, because of the calendar.",
        caption: "The design",
        body: [
          "Clear span of 24 metres, eaves at 7, with the loading bays on the south face away from the access road.",
          "Steel was not the cheapest option. It was the one that could be fabricated off site while the foundations were still going in, which bought about seven weeks against a masonry alternative - and seven weeks was the whole margin.",
        ],
        media: [
          { caption: "Long elevation", kind: "drawing" },
          { caption: "Floor plan with bay positions", kind: "drawing" },
          { caption: "Portal frame section", kind: "drawing" },
        ],
      },
      {
        key: "problem",
        title: "The office block was going to sink the programme.",
        caption: "The problem",
        body: [
          "The original brief had a two-storey office attached to the shed, sharing its structure. That tied the warehouse's completion to the office's finishes - plastering, glazing, fit-out - none of which the client needed in October.",
          "Built as drawn, the whole building would have been handed over at once, in December.",
        ],
        media: [
          { caption: "The original scheme, office attached", kind: "diagram" },
        ],
      },
      {
        key: "solution",
        kicker: "WHAT WE CHANGED",
        title: "We separated the two buildings.",
        caption: "Decoupled",
        body: [
          "The office became a standalone block beside the shed with its own structure and its own services, joined by a covered walkway.",
          "That one change means the warehouse can be occupied and operating while the office is still being finished. It cost a little more in external wall and a separate service run, and it saved the thing the client was actually paying for.",
        ],
        pull:
          "Phasing is not only for projects that run out of money. It is also for projects that run out of time.",
        media: [
          { caption: "Revised site plan, two buildings", kind: "drawing" },
          { caption: "The covered link", kind: "photo" },
        ],
      },
      {
        key: "progress",
        kicker: "WHERE IT STANDS",
        title: "Frame up. Cladding from November.",
        caption: "As at October 2026",
        body: [
          "Foundations and slab complete, portal frame erected and plumbed, roof purlins in. Cladding begins in November and the client moves stock across before the lease ends.",
          "The office block is at foundation level and will follow through to early next year, which was always the plan once the two were separated.",
        ],
        media: [
          { caption: "Frame erected, looking along the clear span", kind: "photo" },
          { caption: "Slab and bay positions", kind: "photo" },
          { caption: "Office block foundations", kind: "photo" },
        ],
      },
    ],

    spec: [
      {
        heading: "Site",
        rows: [
          { term: "Location", value: "Ruiru, Kiambu County" },
          { term: "Plot", value: "Approx. 0.9 acres" },
          { term: "Access", value: "Container-rated, single entry" },
        ],
      },
      {
        heading: "The building",
        rows: [
          { term: "Structure", value: "Steel portal frame" },
          { term: "Clear span", value: "24 m" },
          { term: "Eaves height", value: "7 m" },
          { term: "Loading bays", value: "3, south face" },
          { term: "Office", value: "Standalone, two storeys" },
        ],
      },
      {
        heading: "Programme",
        rows: [
          { term: "Started", value: "January 2026" },
          { term: "Warehouse handover", value: "Target November 2026" },
          { term: "Office handover", value: "Target Q1 2027" },
        ],
      },
    ],

    askHeading: "Is a date driving your project?",
    askBody:
      "A lease ending, a season, a tenant waiting. When the date is fixed it has to shape the design rather than be bolted on at the end, and that is a different conversation from a normal build. Ask here and it reaches us tagged to this project.",
  },
];

/**
 * Reserved - /portfolio/gallery is a real page, so a case study may never
 * take that slug or it would be unreachable behind the static route.
 */
export const RESERVED_PORTFOLIO_SLUGS = ["gallery"];

export function getCaseStudies(): CaseStudy[] {
  const showDrafts = process.env.NODE_ENV !== "production";
  return caseStudies.filter((c) => showDrafts || !c.draft);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}
