import React from "react";
import Link from "next/link";
import MediaFrame from "./MediaFrame";
import {
  CaseStudy,
  CATEGORY_LABELS,
  STATUS_LABELS,
} from "@/data/caseStudies";

/**
 * A case study on the landing grid.
 *
 * The STATUS badge is deliberately plain and unapologetic. A project under
 * construction is not a lesser case study - it is current work, and saying
 * so is a fact about the project rather than a confession about the website.
 * That is a different thing from the readiness narration we stripped off the
 * Learn pages, which told visitors which parts of the SITE were unfinished.
 */
const CaseCard: React.FC<{ study: CaseStudy; image?: string }> = ({
  study,
  image,
}) => (
  <Link
    href={`/portfolio/${study.slug}`}
    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[color:var(--rule)] bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.1)]"
  >
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <MediaFrame src={image} kind="photo" caption={study.title} />
      {study.status !== "complete" && (
        <span className="absolute left-3 top-3 z-[2] rounded-md bg-[color:var(--navy)] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white">
          {STATUS_LABELS[study.status]}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6 lg:p-7">
      <p className="eyebrow">
        Case study {study.index} &middot; {CATEGORY_LABELS[study.category]}
      </p>
      <h3 className="t-card mt-2">{study.headline}</h3>

      <ul className="mt-4 flex list-none flex-col gap-2 p-0">
        {study.talkingPoints.slice(0, 4).map((point) => (
          <li
            key={point}
            className="relative pl-[1.05rem] text-[length:var(--type-meta)] leading-[1.5] text-[color:var(--text-faint)]"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.62em] h-[5px] w-[5px] rounded-full bg-[color:var(--accent)]"
            />
            {point}
          </li>
        ))}
      </ul>

      <span className="mt-5 flex items-center justify-between gap-4 border-t border-[color:var(--rule)] pt-4 text-[length:var(--type-meta)] font-bold text-[color:var(--accent)]">
        Read the case study
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </div>
  </Link>
);

export default CaseCard;
