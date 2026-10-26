import { LearnQuestion } from "@/types";

/**
 * PUBLIC QUESTIONS
 * ----------------
 * Questions belong to one publication, never to the hub as a whole. A
 * question about what was said at 22:30 of an episode is attached to that
 * episode, and the answer is read by the next person who watches it.
 *
 * MODERATION IS THE ANTI-SPAM STRATEGY. Nothing appears publicly until a
 * person approves it. Link spam exists to be crawled; a question sitting in
 * a queue is worth nothing to a spammer - no live link, no ranking, no
 * traffic. The honeypot, the submit-time check and the rate limit in the
 * route handler only exist to keep the queue short enough to clear daily.
 *
 * STORAGE, once wired: a second SharePoint list reached through the same
 * Graph app as the leads, with a Status column (New / Approved / Answered /
 * Rejected) doing the moderation. Approving a question is changing a
 * dropdown - there is no admin UI to build. See claude/website-backlog.md.
 *
 * UNTIL THEN: development shows the sample thread below so the page can be
 * designed and reviewed; production shows nothing at all, because inventing
 * customer questions on a live site would be a lie.
 */

const CONFIGURED = Boolean(process.env.MS_QUESTIONS_LIST_ID);
const SHOW_SAMPLES = !CONFIGURED && process.env.NODE_ENV !== "production";

/**
 * SAMPLE DATA - development only, never served in production.
 * These are real questions Benchmark is asked; the names are invented.
 */
const samples: LearnQuestion[] = [
  {
    id: "s1",
    slug: "jenga-kwako-who-qualifies",
    question: "Can I start building if the title is still in my father's name?",
    askerName: "Mwangi K.",
    askerPlace: "Kiambu",
    askedAt: "2026-10-08",
    answeredBy: "Benchmark · Technical team",
    answer:
      "You can build, but you cannot finance. Any bank takes a charge on the title, and it cannot do that against a name that is not yours. If your father is alive, a transfer or a registered consent is the cleaner route; if he is not, the succession has to close first. Start that now, because it moves slower than your drawings will.",
  },
  {
    id: "s2",
    slug: "jenga-kwako-who-qualifies",
    question:
      "Does the 9.5% rate change if I only build to roof level and finish later?",
    askerName: "Anonymous",
    askedAt: "2026-10-02",
    answeredBy: "Benchmark · Technical team",
    answer:
      "The rate does not change - it is fixed for the term. What changes is the drawdown. The bank releases against certified stages, so stopping at roof level stops the release there too, and the repayment is calculated on what you have actually drawn. The risk is the second phase: you re-enter at whatever the terms are then, and an unfinished house is harder security.",
  },
  {
    id: "s3",
    slug: "diaspora-payment-guide-usa",
    question: "I am in Dallas. Can my brother sign off the payment stages for me?",
    askerName: "Grace W.",
    askerPlace: "Texas",
    askedAt: "2026-09-26",
    answeredBy: "Benchmark · Technical team",
    answer:
      "He can hold a power of attorney, and many people do it that way. We would still not make him the one who certifies the work. Certification should sit with someone whose professional registration is on the line - the project QS or the supervising engineer - and your brother should be the second pair of eyes, not the only pair. That one separation prevents most of what goes wrong on diaspora builds.",
  },
];

/** Approved, answered questions for one publication. Newest first. */
export async function getQuestionsForSlug(
  slug: string,
): Promise<LearnQuestion[]> {
  if (!SHOW_SAMPLES) return [];
  return samples
    .filter((q) => q.slug === slug)
    .sort((a, b) => b.askedAt.localeCompare(a.askedAt));
}

/** The hub's "recently answered" rail: newest approved across every item. */
export async function getRecentQuestions(limit = 3): Promise<LearnQuestion[]> {
  if (!SHOW_SAMPLES) return [];
  return [...samples]
    .sort((a, b) => b.askedAt.localeCompare(a.askedAt))
    .slice(0, limit);
}

/** How many answered questions exist in total. Shown on the hub. */
export async function getAnsweredCount(): Promise<number> {
  if (!SHOW_SAMPLES) return 0;
  return samples.filter((q) => q.answer).length;
}
