/**
 * "WHICH ONE IS ME?"
 * ------------------
 * Six products is one too many to choose between cold. Observation and
 * verbal feedback both pointed at the same thing: visitors could not tell
 * which route applied to them, so they read all six or none.
 *
 * This is a decision tree, not a quiz. At most three questions, and most
 * paths finish in one or two - the moment an answer determines the outcome
 * on its own, it resolves there rather than asking for politeness.
 *
 * Every option carries `resolve` or `next`, never both and never neither,
 * so the tree cannot dead-end. `resolve` names a product by its title; the
 * slug is derived with generateSlug at render time, so renaming a product
 * in products.ts cannot leave a broken link behind here.
 *
 * The answers are also the most useful analytics on the site: they tell you
 * what proportion of your traffic has land, needs financing, or is abroad -
 * which no page-view report can.
 */

export interface RouterOption {
  label: string;
  /** Product title to land on. Mutually exclusive with `next`. */
  resolve?: string;
  /** Id of the next question. Mutually exclusive with `resolve`. */
  next?: string;
}

export interface RouterQuestion {
  id: string;
  /** Short label for the breadcrumb of answered steps. */
  short: string;
  question: string;
  options: RouterOption[];
}

export const routerQuestions: RouterQuestion[] = [
  /**
   * COPY NOTE
   * The first version of these read like an intake form - "Where are you
   * starting from?", "How will the project be paid for?" - passive, and
   * phrased from our side of the desk. Three changes:
   *
   *   - The questions are spoken, not printed. "First -", "And", "Last one -"
   *     are the words a person uses, and they also tell you where you are in
   *     the sequence without a progress bar doing it.
   *   - Every option is in the visitor's own voice and starts with a noun or
   *     an I. They are choosing a description of themselves, not ticking a
   *     category we assigned them.
   *   - Nothing asks for anything. No budget, no timeline, no contact - the
   *     three questions are the three facts that actually change the answer,
   *     and asking for a fourth would turn an aid into a qualification call.
   */
  {
    id: "start",
    short: "What you have",
    question: "First — what do you have so far?",
    options: [
      { label: "A plot, ready to build on", next: "funding" },
      { label: "Nothing yet. Still looking for land.", next: "funding" },
      {
        label: "A building that needs work",
        resolve: "Repairs, Renovations & Remodelling",
      },
    ],
  },
  {
    id: "funding",
    short: "How it is paid for",
    question: "And how are you paying for it?",
    options: [
      { label: "My own money", next: "where" },
      { label: "I will need financing", resolve: "Jenga Kwako" },
      {
        label: "I will buy my own materials and hire a team",
        resolve: "Labour Only",
      },
      {
        label: "Just drawings or a BOQ for now",
        resolve: "Building Consultancy",
      },
    ],
  },
  {
    id: "where",
    short: "Where you will be",
    question: "Last one — where will you be while we build?",
    options: [
      { label: "Here in Kenya", resolve: "Jenga Stress Free" },
      { label: "Abroad", resolve: "Diaspora Building Solutions" },
    ],
  },
];

/** The first question is always the entry point. */
export const routerEntryId = routerQuestions[0].id;
