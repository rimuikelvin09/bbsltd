import React from "react";
import { SpecGroup } from "@/data/caseStudies";

/**
 * The specification block - and the ONLY place on this page an accordion
 * belongs. An accordion is a promise that what is inside is skippable, which
 * is true of plot dimensions and unit mixes and emphatically not true of the
 * narrative. Folded by default: reference, not argument.
 */
const CaseSpec: React.FC<{ groups: SpecGroup[] }> = ({ groups }) => {
  if (!groups.length) return null;

  return (
    <div className="mt-12 overflow-hidden rounded-xl border border-[color:var(--rule)]">
      {groups.map((g) => (
        <details
          key={g.heading}
          className="group border-b border-[color:var(--rule)] last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-[length:var(--type-meta)] font-semibold marker:content-none">
            <span
              aria-hidden="true"
              className="inline-block w-[1ch] font-mono font-bold text-[color:var(--accent)] transition-transform group-open:rotate-45"
            >
              +
            </span>
            {g.heading}
          </summary>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 px-4 pb-4 pl-11 text-[length:var(--type-meta)]">
            {g.rows.map((r) => (
              <React.Fragment key={r.term}>
                <dt className="text-[color:var(--text-muted)]">{r.term}</dt>
                <dd className="m-0 min-w-0 font-semibold">{r.value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
};

export default CaseSpec;
