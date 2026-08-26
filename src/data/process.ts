export interface ProcessStage {
  name: string;
  body: string;
}

/**
 * THE PROCESS
 * -----------
 * Six stages. Presentation drawings and working drawings used to be listed
 * separately, but from the client's side they are one commitment — you
 * approve what you can see, and that approval becomes the technical set.
 * Splitting them made the journey look longer than it feels.
 *
 * Taken from the company profile, which prints them as 1, 2, 3, 4, 6, 7, 8:
 * the numbering there skips 5 and no fifth stage exists on the page. Treated
 * as a numbering error. The profile document still needs correcting.
 */
export const processStages: ProcessStage[] = [
  {
    name: "Consultation",
    body: "Every project begins with a conversation. We sit down with you to understand your vision, your needs and your goals — then map out a clear path forward together.",
  },
  {
    name: "Site Visit",
    body: "Our technical team visits your site to assess its potential and determine what is feasible. You receive a detailed site visit report setting out exactly what can be achieved on your piece of land.",
  },
  {
    name: "Drawings",
    body: "Your architect turns the brief into 3D presentation drawings first, so you can see the project and change your mind while changing your mind is still free. Once you are satisfied, that approved design becomes the full technical set — architectural, structural, mechanical and electrical — which is what the approvals and the build then run on.",
  },
  {
    name: "Compliance & Approvals",
    body: "We handle the entire approvals process on your behalf — submitting drawings to the county government, managing NEMA approvals and responding to regulatory queries.",
  },
  {
    name: "Costing",
    body: "With approvals in place we prepare a comprehensive Bill of Quantities, giving you a clear and accurate picture of your total construction cost. No surprises.",
  },
  {
    name: "Construction",
    body: "From foundation to finishing we manage the full build, maintaining strict quality standards at every stage and delivering a structure you will be proud of.",
  },
];
