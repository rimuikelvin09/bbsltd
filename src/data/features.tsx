import {
  FiTool,
  FiCheckCircle,
  FiEye,
  FiBriefcase,
  FiCompass,
  FiUsers,
  FiBook,
  FiBarChart,
} from "react-icons/fi";
import { IFeature } from "@/types";

/**
 * CLIENT PORTAL, THE THREE THINGS IT HOLDS
 *
 * Rewritten Oct 2026. The previous version of this file was copy from the
 * starter template the site was built on and was not about construction at
 * all: app-store ratings, integrated financial institutions, "Experience
 * True Peace of mind". It was live, in the main navigation, on the one page
 * whose entire subject is transparency.
 *
 * THE RULE FOR THIS FILE. Every line here is a promise about software a
 * client will log into, so nothing goes in that the portal does not do.
 * Not "will do soon", not "is planned". If a capability is dropped from the
 * build, delete the line here in the same commit. A visitor who logs in and
 * cannot find what this page promised has learned something far worse than
 * that a feature is missing.
 *
 * ON "RECORDS, NOT REPORTS". That distinction is the argument of the whole
 * page and it is worth keeping in the copy: a record is written as the work
 * happens, a report is written afterwards by somebody who would like to
 * look good. Everything below is the first kind.
 */
export const features: IFeature[] = [
  {
    title: "Where the project stands",
    description:
      "Progress photographs and site records, dated as they are taken. You can see what happened last week without calling anybody.",
    bullets: [
      {
        title: "Dated progress photographs",
        description:
          "Each stage is photographed as it is done, so the record is built while the work happens rather than assembled afterwards.",
        icon: <FiEye size={26} />,
      },
      {
        title: "Stages as they clear",
        description:
          "Foundation, slab, roof, finishes. You are told as each one is reached instead of having to ask where things are.",
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: "Open it on your phone",
        description:
          "The same record on a phone as on a laptop, which is what matters when you are checking from another time zone.",
        icon: <FiCompass size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup3.png",
  },
  {
    title: "Where the money stands",
    description:
      "Your cost position against the bill of quantities, with variations raised and signed before anything is spent.",
    bullets: [
      {
        title: "Spent against priced",
        description:
          "What has gone out, line by line, against what was costed in the bill of quantities. You can see the position without waiting for a statement.",
        icon: <FiBarChart size={26} />,
      },
      {
        title: "Invoices and payments in one list",
        description:
          "Every invoice raised and every payment received, in order, with nothing left for you to reconcile by hand.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "Variations before the money moves",
        description:
          "A change is costed and signed off before it is built. That is the whole point of raising it: so there is nothing to explain at the end of the job.",
        icon: <FiTool size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup.png",
  },
  {
    title: "Every document in one place",
    description:
      "Drawings, approvals, permits and contracts. The current version, not the one sitting in somebody's email.",
    bullets: [
      {
        title: "Drawings and approvals together",
        description:
          "The architectural, structural and MEP sets, plus the county and NEMA approvals, filed where you can actually find them.",
        icon: <FiBook size={26} />,
      },
      {
        title: "Always the current version",
        description:
          "A superseded drawing is marked as superseded, so nobody on site builds off an old sheet.",
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: "Take a copy yourself",
        description:
          "Upload a document or download one whenever you want. You do not have to ask anybody to email it to you.",
        icon: <FiUsers size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup1.png",
  },
];
