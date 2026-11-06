// data/ourapproach.ts
import { OurApproachData } from "@/types";

/**
 * OUR APPROACH, the client blueprint
 *
 * Rewritten Oct 2026. Two problems with the previous version.
 *
 * FIRST, it was not construction copy. "We spread our creative net and
 * gather a full range of factors and influences", "challenge preconception".
 * That is design-practice language and it carried two live typos.
 *
 * SECOND, and more seriously, it read as a SECOND PROCESS LIST. The home
 * page already describes how a building gets built: the brief, the design,
 * the approvals, the construction. A visitor who read both pages came away
 * with two different accounts of how this firm works, which is worse than
 * having one.
 *
 * THE DISTINCTION THIS FILE NOW HOLDS, and the reason to keep both:
 *
 *   The construction roadmap (data/process.ts) = what happens to the
 *   BUILDING, in order. Brief, design, approvals, build, handover.
 *
 *   This file = what happens to the CLIENT, in order. It starts before any
 *   drawing exists and it is about how decisions get made and who carries
 *   them.
 *
 * The `description` below states that difference out loud, because a reader
 * will not infer it. If you edit one of these two files, read the other.
 *
 * DO NOT RENAME THE SIX STEPS. components/OurApproach.tsx picks each icon by
 * switching on the lower-cased step title: listen, explore, involve, distill,
 * express, execute. A renamed step silently loses its icon rather than
 * breaking, which is the kind of fault nobody notices for months.
 */
export const ourApproachData: OurApproachData = {
  title: "Our Approach",
  description:
    "This is how we work with you, not how we build. The roadmap on our home page is the sequence a building goes through. This is the sequence a client goes through, and it starts well before there is anything to draw.",
  imageSrc: "/images/ourapproach.jpg",
  steps: [
    {
      title: "Listen",
      description:
        "The first meeting is you talking and us writing. What you want, what you already have, and what you are worried about. We do not put a proposal in front of you on day one.",
    },
    {
      title: "Explore",
      description:
        "We go and look. The plot, the levels, the access, the neighbours, what the county will allow, and what comparable buildings nearby are costing or earning.",
    },
    {
      title: "Involve",
      description:
        "You get options with a cost against each one, including the options we would not choose. The decision stays yours, and you can see what each one costs before you make it.",
    },
    {
      title: "Distill",
      description:
        "We cut the brief down to what the budget and the site can genuinely carry. We have that conversation now rather than in month nine.",
    },
    {
      title: "Express",
      description:
        "The agreed brief becomes drawings, a bill of quantities and a programme. Everything you have told us, written down in a form you can check line by line.",
    },
    {
      title: "Execute",
      description:
        "We build it. You watch the progress and the cost position as the work happens, rather than being told about both once it is finished.",
    },
  ],
};
