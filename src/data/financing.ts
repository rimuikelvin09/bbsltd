/**
 * AFFORDABLE CONSTRUCTION FINANCING
 * ---------------------------------
 * Content for the hub at /learn/financing and the two tools that hang off it.
 *
 * WHY A HUB AND NOT A SEVENTH CATEGORY. Every Learn category is a FORMAT:
 * Podcast, Articles, Guides, Legislation, Trends, 3D Models. A category
 * called "financing" would be the only TOPIC among them, and it creates a
 * filing question with no good answer: does an article about financing go in
 * Articles or in Financing? Is a change to the Affordable Housing Levy
 * Legislation or Financing? So this is a VIEW over the existing categories,
 * gathered by the `financing` topic that items already carry. Each item keeps
 * its real home. Nothing moves.
 *
 * RESERVED SEGMENT. /learn/financing is a real static route and it would
 * shadow /learn/[category] if a category were ever slugged "financing".
 * See RESERVED_LEARN_SEGMENTS below, and keep it enforced.
 *
 * ON THE TAX SECTION. We are a building contractor, not a tax adviser, and
 * the line between explaining a published rule and advising somebody on
 * their own position is one we do not cross. So this file states the rule,
 * cites the Act, and stops. There is deliberately NO tax-band input and NO
 * calculation of what any individual gets back: that is KRA's job or their
 * accountant's, and getting it wrong for a client would be far more
 * expensive than the extra conversion a calculator might win.
 */

/** Static segments under /learn that no category may ever be slugged. */
export const RESERVED_LEARN_SEGMENTS = ["financing"] as const;

export interface RequirementGroup {
  title: string;
  note?: string;
  items: string[];
}

/**
 * Transcribed from the Jenga Kwako Requirements Checklist PDF, Nov 2026.
 * TWO DELIBERATE DEPARTURES FROM THAT PDF:
 *   1. "title or lease" is written as TITLE only. Confirmed with Kelvin:
 *      the product takes a title deed, not a certificate of lease.
 *   2. Sentence case and full stops, per the site's voice rules.
 * Everything else is the bank's own wording. Do not reword a requirement to
 * read better: if the bank asks for "12 months certified bank statements",
 * that is what a client has to hand over, and softening it costs them a
 * rejected application.
 */
export const salariedRequirements: RequirementGroup = {
  title: "If you are salaried",
  items: [
    "National ID or passport.",
    "KRA PIN certificate.",
    "Three months of payslips, certified by your employer.",
    "Twelve months of salary account statements, certified by the bank.",
    "An employer introduction letter stating the position you hold, your terms of employment and the retirement age under company policy.",
    "Sale agreement or offer for sale, signed by both the buyer and the seller.",
    "A copy of the title for the property to be purchased.",
  ],
};

export const selfEmployedRequirements: RequirementGroup = {
  title: "If you are self-employed",
  items: [
    "National ID or passport.",
    "KRA PIN certificate.",
    "Audited accounts for the last three years.",
    "Twelve months of certified bank statements.",
    "Business identification documents. For a registered company that is the certificate of incorporation and the company KRA PIN. For a trading business it is the business permit.",
    "Sale agreement or offer for sale, signed by both the buyer and the seller.",
    "A copy of the title for the property to be purchased.",
  ],
};

export const constructionRequirements: RequirementGroup = {
  title: "The construction documents",
  note: "Required whether you are salaried or self-employed. This is the stack we prepare with you, and it is where most of the delay happens on applications we do not handle.",
  items: [
    "Priced bill of quantities.",
    "Approved building plans, not more than two years old, showing the plinth area.",
    "Approved structural drawings, in multiple floor plans.",
    "NCA compliance certificate, for projects above KES 5 million.",
    "Signed contracts between you as the borrower and the technical team, setting out the scope of work and the terms of engagement.",
    "Registration certificates and current practising certificates for the quantity surveyor, architect, structural engineer and contractor.",
  ],
};

export const requirementTracks = [
  { id: "salaried", label: "Salaried", group: salariedRequirements },
  { id: "self-employed", label: "Self-employed", group: selfEmployedRequirements },
] as const;
