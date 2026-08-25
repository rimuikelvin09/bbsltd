export interface ProcessStage {
  name: string;
  body: string;
}

/**
 * THE PROCESS
 * -----------
 * Seven stages, taken from the company profile. Note the profile itself
 * prints them as 1, 2, 3, 4, 6, 7, 8 -- the numbering skips 5 and no
 * fifth stage exists anywhere on the page. Confirmed as a numbering
 * error, so they run 1-7 here. The profile document still needs fixing.
 *
 * This section carries the transparency argument on the home page, and
 * it is also where the page does its Costly Signaling: seven documented
 * stages is visible effort, which is what makes "we are transparent"
 * credible rather than merely claimed.
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
    name: "Presentation Drawings",
    body: "Our architect translates your vision into clear, detailed 3D drawings. You see the project come to life — and make any adjustments — before a single brick is laid.",
  },
  {
    name: "Working Drawings",
    body: "Once you are satisfied with the design, we produce the full set of technical drawings your project needs: architectural, structural, mechanical and electrical.",
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
