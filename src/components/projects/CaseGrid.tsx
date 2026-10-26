"use client";

import React, { useMemo, useState } from "react";
import CaseCard from "./CaseCard";
import { CaseStudy, CaseCategory, CATEGORY_LABELS } from "@/data/caseStudies";

export interface CaseGridItem {
  study: CaseStudy;
  image?: string;
}

/**
 * THE CASE-STUDY GRID, WITH ITS FILTER.
 *
 * The filter is built FROM THE DATA, not from the full category list, and
 * each chip carries a count. Two consequences, both deliberate:
 *
 *  - It is never wrong. A category with nothing in it never appears, so
 *    nobody can click through to an empty result - which is the failure
 *    that makes a filter feel broken rather than useful.
 *  - It scales without edits. Add a repair case study and a "Repair and
 *    refurbishment" chip appears on its own.
 *
 * At three studies a filter is arguably premature - Hick's Law says every
 * choice costs something, and three cards are faster to scan than to
 * filter. It earns its place around eight to ten. It is here now because
 * building it later means rebuilding the grid later, and because the chips
 * double as a statement of RANGE: seeing "Plot to income", "Design
 * commission" and "Commercial" side by side tells a visitor we do more than
 * one thing before they have read a single card.
 *
 * State is in the component rather than the URL. At this size a shareable
 * filtered view is worth less than avoiding three thin, near-duplicate
 * pages for Google to index.
 */
const CaseGrid: React.FC<{ items: CaseGridItem[] }> = ({ items }) => {
  const [active, setActive] = useState<CaseCategory | "all">("all");

  const chips = useMemo(() => {
    const counts = new Map<CaseCategory, number>();
    items.forEach(({ study }) =>
      counts.set(study.category, (counts.get(study.category) ?? 0) + 1),
    );
    return Array.from(counts.entries());
  }, [items]);

  const shown = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter(({ study }) => study.category === active),
    [items, active],
  );

  const chip = (key: CaseCategory | "all", label: string, count: number) => {
    const on = active === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => setActive(key)}
        aria-pressed={on}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[length:var(--type-meta)] font-semibold transition-colors ${
          on
            ? "border-[color:var(--navy)] bg-[color:var(--navy)] text-white"
            : "border-[color:var(--rule)] text-[color:var(--text-faint)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        }`}
      >
        {label}
        <span className="text-[0.72rem] font-bold opacity-60 [font-variant-numeric:tabular-nums]">
          {count}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Only worth showing once there is more than one category. */}
      {chips.length > 1 && (
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter case studies by type of project"
        >
          {chip("all", "All", items.length)}
          {chips.map(([cat, n]) => chip(cat, CATEGORY_LABELS[cat], n))}
        </div>
      )}

      <div
        className={
          shown.length < 2
            ? "grid grid-cols-1 gap-6"
            : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        }
      >
        {shown.map(({ study, image }) => (
          <CaseCard key={study.slug} study={study} image={image} />
        ))}
      </div>
    </>
  );
};

export default CaseGrid;
