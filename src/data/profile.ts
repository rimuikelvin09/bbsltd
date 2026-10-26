/**
 * CORPORATE PROFILE — CONTENT
 * ---------------------------
 * Every word and every figure on /about/profile lives here, so the page
 * component stays structure and the copy can be edited without touching
 * JSX. That matters more on this page than on any other: a corporate
 * profile gets revised by people who do not write React.
 *
 * TWO KINDS OF NUMBER APPEAR ON THIS PAGE and they are not interchangeable.
 *
 *   MARKET figures are third-party and every one carries a named source and
 *   a year in `sourceRows` below. They are what make the page credible to a
 *   bank, KMRC or an institutional client.
 *
 *   BENCHMARK figures are our own record. They are marked `internal` in
 *   `sourceRows` and must have a defined basis before they are published -
 *   "100% compliant" and "under 2% indiscipline cases" both invite the
 *   question "measured how, over what period?" and we need the answer ready.
 *
 * Nothing here is rounded up for effect. If a figure cannot be defended it
 * comes off the page rather than getting softened, because one soft number
 * discredits the ones standing next to it.
 */

import { footerDetails } from "./footer";

export interface ProfileStat {
  /** The headline number, pre-formatted. */
  figure: string;
  /** What the number counts. One line. */
  claim: string;
  /** The qualifier that stops it being misread. */
  detail: string;
  /** Body and year, rendered in the card foot. */
  source: string;
}

export interface ProfilePillar {
  index: string;
  kicker: string;
  title: string;
  body: string;
  figure: string;
  figureNote: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export type DifferentiatorIcon = "tech" | "partners" | "culture" | "talent";

export interface Differentiator {
  icon: DifferentiatorIcon;
  title: string;
  body: string;
  points: string[];
}

export interface SourceRow {
  figure: string;
  claim: string;
  source: string;
  year: string;
  /** Renders in the accent colour and reads as "do not publish yet". */
  unconfirmed?: boolean;
}

/**
 * THE PUBLISH SWITCH.
 *
 * The page is built and the copy is written. It is held back because two
 * figures on it - "100% of projects compliant" and "under 2% indiscipline
 * cases" - have no defined basis yet, and the film it opens on is still
 * third-party branded. Flip this to true once both are settled; nothing
 * else needs changing.
 */
export const PROFILE_PUBLISHED = false;

export const profileHero = {
  eyebrow: "Corporate profile",
  heading: "Benchmark Building Solutions",
  lede:
    "A Kenyan building contractor since 2012, and from 2026 a developer. We build homes people own and property that earns - and we put the systems in place to prove, at every stage, exactly what your money bought.",
  videoSrc: "/videos/introvid.mp4",
  /**
   * The .vtt does not exist yet. IntroVideo wires the track and forces
   * captions on, so they appear the moment the file lands at this path.
   */
  captionsSrc: "/videos/introvid.vtt",
  videoPoster: "/images/introvid-poster.jpg",
  videoLabel: "Meet Benchmark Building Solutions",
};

export const profileOverview = {
  eyebrow: "Who we are",
  heading: "You should always know exactly what your money has bought.",
  paragraphs: [
    "Benchmark Building Solutions is a Kenyan building contractor, and from 2026 a developer. We build homes people own and property that earns - rentals, offices, warehouses, institutions. There is no shortage of capital, land or ambition in this market: construction is 6.5% of Kenya's economy and grew 6.8% in 2025, faster than the economy around it.",
    "What clients tell us they want is simpler than any of that. They want to know the quantities are right. They want a variation explained before it is spent, not after. They want to ask where the project stands on a Tuesday and get an answer rather than an investigation. We built this company so that those are the ordinary conditions of working with us - not things you have to keep insisting on.",
  ],
  pull: "Our business is making certainty the normal experience of building in Kenya.",
};

export const marketStats: ProfileStat[] = [
  {
    figure: "250,000",
    claim: "New homes Kenya needs each year",
    detail:
      "Against roughly 50,000 formal units actually completed - a shortfall near 200,000 homes a year.",
    source: "CAHF, Housing Finance in Africa - Kenya, 2025",
  },
  {
    figure: "30,015",
    claim: "Mortgage accounts in the entire country",
    detail:
      "In a population of 53.3 million. Average rate 14.3%, ranging 8.7-18.6%.",
    source: "Central Bank of Kenya, 2023; KNBS population, 2025",
  },
  {
    figure: "45%",
    claim: "Of Kenyans live in informal or inadequate housing",
    detail: "50.8% of the urban population lived in slum conditions in 2020.",
    source: "CAHF / UN-Habitat, 2025 edition",
  },
  {
    figure: "87.2%",
    claim: "Of the 822,100 jobs created in 2025 were informal",
    detail:
      "Construction added jobs faster than any other industry, at 6.7%.",
    source: "KNBS, Economic Survey 2026",
  },
];

export const profilePillars: ProfilePillar[] = [
  {
    index: "01",
    kicker: "Affordable housing",
    title: "Closing the ownership gap",
    body:
      "The shortfall is not mainly a construction-capacity problem - it is a financing and delivery problem. Kenyans who can afford a monthly repayment still cannot reach a product that lets them make one. In 2024 we came in through the KMRC route and built Jenga Kwako around it: the same build, with the financing arranged at a fixed rate a salaried Kenyan can actually carry, over a term that does not break them.",
    figure: "10,000",
    figureNote:
      "State affordable-housing units completed by September 2026, against a 300,000-unit target and more than a million Boma Yangu sign-ups. The gap is where private contractors belong.",
  },
  {
    index: "02",
    kicker: "Plot to income",
    title: "Property that pays for itself",
    body:
      "Not everyone building is building a home. Investors put up rentals, offices, warehouses, schools and clinics, and what they want from a contractor is not inspiration - it is a sequence that does not bleed time or money. We run plot-to-income work as a managed process: feasibility, approvals, procurement, construction, handover, with the cost position visible at every stage rather than revealed at the end.",
    figure: "6.5%",
    figureNote:
      "Construction's share of Kenya's GDP in 2025, growing 6.8% after contracting 0.7% the year before. The capital is returning; the delivery discipline is what is scarce. KNBS, 2026.",
  },
  {
    index: "03",
    kicker: "Trust and governance",
    title: "Transparency as a system, not a slogan",
    body:
      "Anyone can promise to be straight with you. We built the machinery that makes it automatic: approvals documented with an audit trail, costing that reconciles line by line, variations raised and signed before the money moves, and a client portal where the project's status is a record you can open at midnight rather than a phone call you have to chase. You never have to ask us to be transparent - the system already has been.",
    figure: "100%",
    figureNote:
      "Of our projects compliant with NCA, NEMA and county approvals - and zero approvals for you to chase. We handle the filings, the inspections and the sign-offs as part of the job, not as your homework.",
  },
  {
    index: "04",
    kicker: "Impact",
    title: "The people who actually build",
    body:
      "Roughly 84% of Kenya's working population is in informal employment, and construction creates more of those jobs than any other industry. The man on site - the mtu wa mkono - typically has no contract, no training path and no safety net. We run counselling, financial-literacy programmes and a defined progression from mtu wa mkono to skilled fundi to foreman and beyond.",
    figure: "Not charity",
    figureNote:
      "A site run by people who are looked after is a site that does not cut corners and does not need watching. The welfare programme is the quality-control system.",
  },
];

export const profileTimeline: TimelineEntry[] = [
  {
    year: "2012",
    title: "DAVSO East Africa is registered",
    body:
      "Set up to tender for government infrastructure works. The tenders never came. Referral work did - plot-own homes and plot-income projects, from people we had worked with before. We kept the company and kept building.",
  },
  {
    year: "2021",
    title: "Benchmark Building Solutions",
    body:
      "A rebrand on paper; a rebuild in practice. Before chasing the market we put the things behind the name in place first - governance structures, documented systems, books that reconcile.",
  },
  {
    year: "2024",
    title: "Affordable housing, and Jenga Kwako",
    body:
      "Entry into the affordable-housing market through the KMRC channel. It let us put the financing next to the build instead of leaving the client to go and find it. Jenga Kwako was built around that.",
  },
  {
    year: "2026",
    title: "Benchmark Signature Homes",
    body:
      "The developer arm. Until now we built what clients commissioned. Signature Homes builds what we commission - for people who would rather buy than build, and for the generations who will still be living in these houses in fifty years.",
  },
];

export const differentiators: Differentiator[] = [
  {
    icon: "tech",
    title: "Technology",
    body:
      "We built the ICT backbone before we needed it. Clients see project status, drawings, approvals and cost position in one place, and so do we - which means a question has an answer rather than an investigation.",
    points: [
      "Client portal with live project status",
      "Documented approvals with an audit trail",
      "Costing and cashflow that reconcile to the books",
      "One system of record, not seven spreadsheets",
    ],
  },
  {
    icon: "partners",
    title: "Partnerships",
    body:
      "Financing is not something we refer clients to and hope for. We work directly with KMRC and partner banks so that an affordable product is an actual product - a fixed rate, a known term, a defined qualification path.",
    points: [
      "KMRC-route financing at 9.5% fixed",
      "Partner banks and SACCOs for on-lending",
      "Qualification worked out before design starts",
      "Terms up to 25 years",
    ],
  },
  {
    icon: "culture",
    title: "Culture",
    body:
      "It starts with the directors and it reaches the man at the gate. A culture is not what is written on a wall - it is what happens on a Tuesday afternoon when nobody senior is on site. Ours holds.",
    points: [
      "Under 2% indiscipline cases across our sites",
      "No abusive language tolerated, at any level",
      "Sites kept clean as a standard, not a visit-day exercise",
      "A workforce that comes back to the next project",
    ],
  },
  {
    icon: "talent",
    title: "Talent",
    body:
      "Depth at every level, which in this industry is rarer than depth at the top. Leadership, technologists, architects and engineers, and a skilled trade base we train rather than hire-and-discard.",
    points: [
      "Directors with delivery records, not just titles",
      "In-house architects and engineers",
      "Technologists who build our systems, not buy them",
      "A defined path from mtu wa mkono to foreman",
    ],
  },
];

/**
 * Address, email and phone are READ FROM footerDetails rather than copied.
 * They already exist in one place and a corporate profile carrying a stale
 * phone number is worse than one carrying none.
 */
export const companyParticulars: {
  term: string;
  value: string;
  href?: string;
}[] = [
  { term: "Registered name", value: "Benchmark Building Solutions Ltd" },
  { term: "Formerly", value: "DAVSO East Africa Ltd (2012)" },
  { term: "Location", value: footerDetails.address },
  {
    term: "Email",
    value: footerDetails.email,
    href: "mailto:" + footerDetails.email,
  },
  {
    term: "Phone",
    value: footerDetails.telephones.join("  /  "),
    href: "tel:" + footerDetails.telephones[0].replace(/\s+/g, ""),
  },
];

export const sourceRows: SourceRow[] = [
  { figure: "250,000", claim: "Annual new-housing demand; ~50,000 formal completions", source: "CAHF, Housing Finance in Africa - Kenya profile", year: "2025 ed." },
  { figure: "45%", claim: "Kenyans in informal or inadequate housing", source: "CAHF Kenya profile", year: "2025 ed." },
  { figure: "50.8%", claim: "Urban population in slum conditions", source: "UN-Habitat, via CAHF", year: "2020" },
  { figure: "30,015", claim: "Mortgage accounts nationally", source: "Central Bank of Kenya, via CAHF", year: "2023" },
  { figure: "14.3%", claim: "Average residential mortgage rate (range 8.7-18.6%)", source: "Central Bank of Kenya", year: "2023" },
  { figure: "6.5%", claim: "Construction's share of GDP (current prices)", source: "KNBS, Kenya Facts and Figures 2026", year: "2025" },
  { figure: "6.8% / -0.7%", claim: "Construction sector growth, 2025 against 2024", source: "KNBS, Kenya Facts and Figures 2026", year: "2025" },
  { figure: "6.7%", claim: "Construction employment growth - highest of any industry", source: "KNBS, Economic Survey 2026", year: "2025" },
  { figure: "87.2% of 822,100", claim: "New jobs created informally", source: "KNBS, Economic Survey 2026", year: "2025" },
  { figure: "~84%", claim: "Share of recorded employment that is informal (18.1m of 21.6m)", source: "KNBS, Economic Survey 2026", year: "2025" },
  { figure: "53.3m", claim: "Population of Kenya", source: "KNBS", year: "2025" },
  { figure: "~10,000", claim: "State affordable-housing units completed, against a 300,000 target", source: "Government communique, 15th NDIC, via The Star", year: "Sep 2026" },
  { figure: "1,000,000", claim: "Boma Yangu platform sign-ups", source: "allAfrica", year: "Feb 2026" },
  { figure: "100%", claim: "Our projects compliant with NCA, NEMA and county approvals - define the basis before publishing", source: "Benchmark, internal", year: "confirm", unconfirmed: true },
  { figure: "Under 2%", claim: "Indiscipline cases on site - define what counts as a case, and over what period", source: "Benchmark, internal", year: "confirm", unconfirmed: true },
  { figure: "9.5% / 25yr", claim: "Jenga Kwako terms - confirm these are current", source: "Benchmark / KMRC", year: "confirm", unconfirmed: true },
];
