export interface PhilosophyPanel {
  /** Small label. Only the opening panel uses one. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Core values: names only, exactly as the brand states them. */
  items?: string[];
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
