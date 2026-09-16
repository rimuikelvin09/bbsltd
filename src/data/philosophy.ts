export interface PhilosophyPanel {
  /** Small label. Only the opening panel uses one. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Core values: names only, exactly as the brand states them. */
  items?: string[];
  /**
   * Exact substrings of `body` to mark up as the eye travels. Presentation
   * only - the wording in `body` is the brand's and is never edited, so the
   * phrases to emphasise are declared here rather than by rewriting the
   * sentence with tags inside it. Each must appear in `body` verbatim or it
   * is simply not marked.
   */
  highlights?: string[];
}

/**
 * The panels that cycle through the About hero while the video and the
 * background stay put.
 *
 * THE WORDING BELOW IS THE BRAND'S OWN, VERBATIM. It is used across the
 * company's material, so it is not paraphrased, shortened or given a
 * headline of its own — the section name is the heading and the statement
 * speaks for itself.
 */
export const philosophyPanels: PhilosophyPanel[] = [
  {
    title: "Our Philosophy",
    body: "At Benchmark Building Solutions, we believe in building more than just structures; we build solutions, relationships, and futures. Our customer-first approach drives us to understand your unique needs and deliver versatile, high-quality construction. Rooted in integrity and ethical practices, we are committed to transforming lives by creating homes and communities that empower and endure.",
    // Four marks, spaced through the paragraph, so a reader who is skimming
    // still collects the argument: what we build, who it starts with, what it
    // is built on, and what it is for.
    highlights: [
      "solutions, relationships, and futures",
      "customer-first",
      "integrity and ethical practices",
      "transforming lives",
    ],
  },
  {
    title: "Our Mission",
    body: "To deliver the highest level of service to every client, every day in all areas and be the benchmark in quality, consistency, professionalism and integrity exceeding clients’ expectations while making Benchmark Building Solutions ltd the employer of choice.",
  },
  {
    title: "Our Vision",
    body: "To be the preferred construction, facilities, and associated service partner for our clients and to be the benchmark against which our competitors are measured.",
  },
  {
    title: "Core Values",
    items: ["Quality", "Integrity", "Teamwork", "Excellence", "Safety"],
  },
];
