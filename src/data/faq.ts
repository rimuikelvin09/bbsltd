import { IFAQ } from "@/types";

/**
 * FAQ, rendered on /contact
 *
 * Rewritten Nov 2026, Segment 6 of the copy pass. The previous six answers
 * were reassurance rather than information: "committed to excellence",
 * "exceptional value", "no surprises", "we're just a call away". Six
 * paragraphs that a reader could not act on and a competitor could have
 * published word for word.
 *
 * THE TEST FOR ANYTHING ADDED HERE. Somebody has typed this question into
 * Google because they want a number, a document name or a yes. If the answer
 * does not contain at least one of those three, it is not an answer, it is a
 * holding paragraph. Where we genuinely cannot give a figure, say why, as in
 * the defects liability answer below.
 *
 * `siteDetails.siteName` was interpolated into all six answers and has been
 * dropped. It rendered as "Benchmark Building Solutions ltd", lowercase
 * "ltd", mid-sentence, six times on one page. First person reads better and
 * the company name is already in the page title and the structured data.
 *
 * FIGURES USED HERE, and where they came from:
 *   6 to 12 months residential   already published, and quoted back in
 *                                data/products.ts. Do not change one
 *                                without the other.
 *   12 to 24 months commercial   from the previous version of this file.
 *   NCA accreditation            ours, and stated elsewhere on the site.
 * The defects liability period is deliberately NOT given a number: Kelvin
 * confirmed 5 Nov 2026 that it varies with scope and value, so the answer
 * says that and tells the reader to get their own figure in writing.
 */
export const faqs: IFAQ[] = [
  {
    question: "How long will my construction project take?",
    answer: `A home is normally six to twelve months from foundation to finishing. Commercial work runs longer, usually twelve to twenty-four. Your programme is set during design, once the drawings and the bill of quantities exist, because that is the first point at which anybody can give you a date and mean it. You get that programme in writing, and you are told when something moves rather than finding out at handover.`,
  },
  {
    question: "How do you determine the cost of a project?",
    answer: `Off a measured bill of quantities, not a rate per square metre. A quantity surveyor prices the drawings line by line: materials, labour, approvals, professional fees and preliminaries. You get the whole document rather than a single figure, so you can see what each part of the building costs and change your mind about any of it before we start. Where something genuinely cannot be known yet, it is carried as a named contingency instead of being buried in a round number.`,
  },
  {
    question: "How do you ensure the quality of materials and workmanship?",
    answer: `We are NCA-accredited, and every consultant on your project is ours rather than subcontracted, so the person who specified a detail is the person who checks it was built. Materials are specified in the bill of quantities by standard, which means what arrives on site can be measured against what you paid for. The work is inspected at the stages where a mistake becomes expensive to undo: foundations, each slab, the roof, and before anything gets closed up.`,
  },
  {
    question: "Do you handle permits and compliance with local regulations?",
    answer: `Yes, and it is part of the contract rather than an extra. County submission, NEMA where the project needs it, and every query that comes back from either of them. You are told as each approval clears. You are not sent to follow any of them up, and you are not paying somebody separately to chase them.`,
  },
  {
    question: "How do you keep me updated on project progress?",
    answer: `One site manager is answerable for your project, and the record goes into the client portal as the work happens: dated progress photographs, each approval as it clears, and your cost position against the bill of quantities. You can open it at any hour without asking anybody for it, which matters most if you are building from outside the country. If you would rather have a call or walk the site, that is arranged around how you prefer to work, but the written record is there either way.`,
  },
  {
    question: "What kind of support do you offer after project completion?",
    answer: `Every contract carries a defects liability period: a window after handover in which we come back and put right defects in materials or workmanship at our own cost. The length is set in your contract rather than being one blanket figure, because it moves with the scope and the value of the job, so ask for yours to be stated in writing before you sign and it will be. After that window we are still the people who built it, and we hold the drawings, the approvals and the specification. When you want to alter something in five years, that record is worth more than a warranty card.`,
  },
];
