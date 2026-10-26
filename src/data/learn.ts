import { LearnCategoryDef, LearnItem, LearnNote } from "@/types";

/**
 * CONTENT FOR /learn THAT LIVES IN THE REPO
 *
 * Episodes come from YouTube at build time (lib/learn). Everything here is
 * what YouTube cannot tell us: the categories, the guides, the written
 * pieces and the per-episode show notes.
 *
 * Where written pieces eventually live - Markdown, a CMS, or syndicated
 * from LinkedIn - is undecided. Nothing imports this file directly; it all
 * goes through lib/learn, so swapping the source is one module's work.
 */

/**
 * THE SIX. Array order is the order on the landing page.
 * 3D Models sits second on purpose: it is the most visual thing we will
 * ever put here, so it earns the position even while it is still parked.
 */
export const categories: LearnCategoryDef[] = [
  {
    slug: "podcast",
    title: "Podcast",
    blurb:
      "The Smart Builder Real Estate Podcast. Long conversations with the people who do this for a living.",
    intro: "Real estate, explained by the people who shape it.",
    form: "video",
    // Episode titles are long and the subject carries the decision, not the
    // thumbnail - so a list that has room for a sentence beats a grid.
    defaultView: "list",
  },
  {
    slug: "3d-models",
    parkedNote:
      "Interactive models are the heaviest thing we will put on this site, so they come after the work to make everything else load fast. In the meantime the drawings behind them are real, and we will walk you through them in person.",
    title: "3D Models",
    blurb: "Walk through a house at full size before a single block is laid.",
    intro: "Interactive models of houses we have built and houses you could.",
    form: "written",
    defaultView: "grid",
    // Designed on its own. The card shows, states its position and does not
    // pretend to lead anywhere.
    parked: true,
  },
  {
    slug: "articles",
    parked: true,
    parkedNote:
      "We would rather publish four articles worth reading than twenty worth skimming. The first are being written by the people who run the sites, not by a copywriter, which is slower and the only way they will be any use.",
    title: "Articles",
    blurb:
      "Costs, process, and the things nobody warns you about. Written to answer the question you actually typed.",
    intro:
      "What a build costs, how the process really runs, and where the money goes.",
    form: "written",
    defaultView: "grid",
  },
  {
    slug: "guides",
    title: "Guides",
    blurb:
      "Checklists, repayment tables and document lists. Things you download once and use for months.",
    intro: "Download it, print it, take it to the meeting. Nothing is gated.",
    form: "download",
    defaultView: "grid",
  },
  {
    slug: "legislation",
    parked: true,
    parkedNote:
      "Approval thresholds, county requirements and the Building Code change, and a page that is wrong about NEMA is worse than no page at all. Every figure is being checked against the current regulations before any of it goes up.",
    title: "Legislation",
    blurb:
      "What the NCA, NEMA, the Building Code and your county actually require - in plain language, kept current.",
    intro:
      "The rules that govern building in Kenya, written out so you can act on them.",
    form: "written",
    defaultView: "grid",
  },
  {
    slug: "trends",
    parked: true,
    parkedNote:
      "Most construction trend writing is borrowed from elsewhere and never asks what it means on a Kenyan site. Ours will carry dated, sourced figures or it will not go up.",
    title: "Trends",
    blurb:
      "What shifts in materials, methods and money elsewhere mean for a build in Kenya. Interpretation, not news.",
    intro: "What is changing in construction, and what it means here.",
    form: "written",
    defaultView: "grid",
  },
];

/**
 * CONTROLLED VOCABULARY. Add to it deliberately.
 * Free tags become forty near-duplicates within a year.
 */
export const TOPICS = [
  "costing", "boq", "budget", "approvals", "nema", "county", "compliance",
  "financing", "jenga-kwako", "mortgage", "repayments", "documents",
  "land", "title-deed", "due-diligence", "diaspora", "payments", "usa",
  "supervision", "oversight", "materials", "procurement", "contractors",
  "quotes", "kiambu", "nca", "building-code", "prefabrication",
] as const;

/**
 * SHOW NOTES, keyed by YouTube video id. Optional - an episode without an
 * entry falls back to its YouTube description. Find the id after `v=`.
 */
export const episodeNotes: Record<string, LearnNote[]> = {};

/** TOPICS PER EPISODE, keyed by video id. Also optional. */
export const episodeTopics: Record<string, string[]> = {};

/** The three PDFs already in /public/documents, promoted from footer links. */
export const guides: LearnItem[] = [
  {
    slug: "jenga-kwako-repayment-table",
    category: "guides",
    form: "download",
    title: "Jenga Kwako repayment table",
    summary:
      "Every monthly repayment from KES 1M to 10.5M, across 1 to 25 years, at 9.5% fixed. Find your figure before you talk to anyone.",
    publishedAt: "2026-10-15",
    topics: ["financing", "jenga-kwako", "repayments", "mortgage"],
    fileUrl: "/documents/amortizationtable.pdf",
    fileMeta: "PDF",
  },
  {
    slug: "jenga-kwako-requirements-checklist",
    category: "guides",
    form: "download",
    title: "Jenga Kwako requirements checklist",
    summary:
      "What the bank asks for, salaried and self-employed, plus the construction documents. Gather these before you apply and the file moves.",
    publishedAt: "2026-10-14",
    topics: ["financing", "jenga-kwako", "documents", "mortgage"],
    fileUrl: "/documents/jkrequirements.pdf",
    fileMeta: "PDF",
  },
  {
    slug: "diaspora-payment-guide-usa",
    category: "guides",
    form: "download",
    title: "Diaspora payment guide — USA",
    summary:
      "How to move funds for a build from the United States, step by step, and what evidence to keep at each release.",
    publishedAt: "2026-10-13",
    topics: ["diaspora", "payments", "usa"],
    fileUrl: "/documents/usapaymentguide.pdf",
    fileMeta: "PDF",
  },
];

/**
 * WRITTEN PIECES - articles, legislation and trends.
 *
 * ALL THREE ARE DRAFTS. `draft: true` keeps them out of production builds
 * and shows them, badged, in development, so the layout can be judged with
 * content in it while nothing unreviewed can reach the live site. Every
 * [CONFIRM] marker is a fact that needs checking before publication.
 * Remove the markers and the flag together.
 */
export const written: LearnItem[] = [
  {
    slug: "jenga-kwako-who-qualifies",
    category: "articles",
    form: "written",
    title: "The 9.5% mortgage: who qualifies and what the bank asks for",
    summary:
      "Jenga Kwako lends at 9.5% fixed while the market average sits near 14%. Who it is for, what the bank wants to see, and what the monthly figure looks like.",
    publishedAt: "2026-10-15",
    topics: ["financing", "jenga-kwako", "mortgage", "documents"],
    readingMinutes: 7,
    draft: true,
    blocks: [
      { type: "p", text: "Most people who ask us about financing have already been quoted a rate somewhere else, and the number they were given was close to fourteen per cent. The Central Bank of Kenya put the average commercial bank lending rate at 14.39% in July 2026. Against that, 9.5% fixed is not a marginal improvement. On a twenty-year loan it changes what you can afford to build." },
      { type: "p", text: "This is what Jenga Kwako is, who it is actually for, and what you need in hand before you apply. [CONFIRM: partner bank name and whether it may be stated publicly.]" },
      { type: "h2", text: "What the product is" },
      { type: "p", text: "Jenga Kwako is a construction mortgage, not a purchase mortgage. The distinction matters more than people expect. You are not buying a finished house; you are borrowing against land you already own in order to build on it. The money is released in stages against certified work, rather than in one payment to a seller." },
      { type: "p", text: "The rate is 9.5% fixed for the term, supported by the Kenya Mortgage Refinance Company. Fixed is the part worth pausing on: a variable rate that starts lower can finish higher, and on a twenty-year commitment that is a risk you carry alone. [CONFIRM: maximum term, maximum loan amount, and whether the rate is fixed for the full term.]" },
      { type: "h2", text: "Who it is for" },
      { type: "p", text: "In practice, three groups. People who own a plot and have been saving towards building on it in cash, slowly, for years. People already building who have run out of money somewhere around roof level. And Kenyans abroad who own land here and want to build without flying home every quarter." },
      { type: "p", text: "The common requirement is the one that stops most applications before they start: the title must be in your name. Any lender takes a charge on the title, and it cannot do that against a name that is not yours. If the land is still registered to a parent, start the transfer or the succession now - it moves far more slowly than your drawings will." },
      { type: "h2", text: "What the bank asks for" },
      { type: "p", text: "There are three stacks of paper, gathered in parallel rather than in sequence. The full checklist is in the downloadable guide; in summary:" },
      { type: "ul", items: [
        "Identity and the title. National ID, KRA PIN, and a title deed in your name with a recent official search.",
        "Income. Salaried applicants bring payslips and bank statements; self-employed applicants bring business statements and returns. [CONFIRM: months required for each.]",
        "The build. Approved architectural drawings, a bill of quantities, and county approval for the works.",
      ]},
      { type: "p", text: "The third stack is where most delay happens, and it is the one we handle. Drawings and a bill of quantities are not paperwork you produce to satisfy a bank - they are the thing that tells you what the house costs before you commit to it." },
      { type: "h2", text: "Where people go wrong" },
      { type: "p", text: "Three patterns, repeatedly. Applying before the title is clean, which stalls everything. Budgeting from the construction cost alone and forgetting approvals, professional fees and the connection charges that arrive at the end. And stopping at roof level intending to finish later - the rate does not change, but the release stops there, and an unfinished house is harder security if you need to come back." },
    ],
  },
  {
    slug: "nema-approval-thresholds",
    category: "legislation",
    form: "written",
    title: "NEMA approval: when you need it and when you do not",
    summary:
      "The threshold that decides whether your project needs an environmental licence, what the submission contains, and the two things that stall a file.",
    publishedAt: "2026-10-14",
    topics: ["approvals", "nema", "compliance", "county"],
    readingMinutes: 6,
    draft: true,
    blocks: [
      { type: "p", text: "PLACEHOLDER - structure only. This piece exists so the Legislation category can be designed with content in it. Every figure below needs verifying against the current regulations before anything is published." },
      { type: "h2", text: "The threshold" },
      { type: "p", text: "Not every build needs an environmental licence, and a great many people pay for one they did not require. [CONFIRM: the current project thresholds under the Environmental Management and Co-ordination Act and its regulations, and whether they changed in the latest amendment.]" },
      { type: "h2", text: "What a submission contains" },
      { type: "ul", items: [
        "[CONFIRM: the project report contents and who may prepare one.]",
        "[CONFIRM: whether a registered expert must sign, and the register that applies.]",
        "[CONFIRM: current fees and how they are calculated.]",
      ]},
      { type: "h2", text: "What stalls a file" },
      { type: "p", text: "In our experience two things: a submission that does not match the drawings lodged with the county, and public participation that was not documented properly. Both are avoidable and neither is obvious from the forms." },
      { type: "p", text: "This is the register the whole Legislation category should be written in - what the rule is, what it costs, what goes wrong - rather than quoting the Act back at people." },
    ],
  },
  {
    slug: "prefabrication-what-it-means-here",
    category: "trends",
    form: "written",
    title: "Prefabrication is winning elsewhere. What that means for building here",
    summary:
      "Factory-built components are reshaping construction in several markets. What actually transfers to Kenyan conditions, and what does not.",
    publishedAt: "2026-10-13",
    topics: ["materials", "procurement", "costing", "prefabrication"],
    readingMinutes: 6,
    draft: true,
    blocks: [
      { type: "p", text: "PLACEHOLDER - structure only. This piece exists so the Trends category can be designed with content in it, and to set the register: interpretation for a Kenyan builder, never news aggregation." },
      { type: "h2", text: "What is actually happening" },
      { type: "p", text: "[CONFIRM: current adoption figures and which markets, with sources. Anything cited here must be verifiable and dated.]" },
      { type: "h2", text: "What transfers" },
      { type: "ul", items: [
        "Speed on repeatable units, where the same element is made many times.",
        "Predictable quality on components made under cover rather than on an open site.",
        "Less waste, which matters more as material prices move.",
      ]},
      { type: "h2", text: "What does not" },
      { type: "p", text: "Transport. A panel that saves three days in a factory loses them on a road to a site a lorry cannot reach, and much of the country is that site. Financing is the other barrier: staged release against certified work assumes work happening on the plot, and a bank has no obvious way to certify a component sitting in a yard." },
      { type: "p", text: "That second point is the kind of thing only someone who has drawn down a construction loan would notice - which is precisely why this category is worth writing and why a reposted news item would not be." },
    ],
  },
];
