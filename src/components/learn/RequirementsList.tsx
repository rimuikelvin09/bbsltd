"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  constructionRequirements,
  requirementTracks,
} from "@/data/financing";

/**
 * THE REQUIREMENTS CHECKLIST, as a page rather than a PDF.
 *
 * DELIBERATELY NOT TICKABLE. An earlier draft had checkboxes and a progress
 * bar. They are out: ticks that vanish when the tab closes are worse than no
 * ticks, keeping them would mean browser storage for something a client is
 * actually relying on, and a person gathering bank documents is working off
 * a printed sheet or a phone screen, not a web page they keep open for three
 * weeks. The PDF is what they tick. This page is what they read first.
 *
 * The only interaction is the one that matters: salaried or self-employed,
 * because half the list changes and showing both at once is how people bring
 * the wrong documents.
 */

const RequirementsList: React.FC = () => {
  const [track, setTrack] = useState<string>(requirementTracks[0].id);
  const active =
    requirementTracks.find((t) => t.id === track) ?? requirementTracks[0];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {requirementTracks.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTrack(t.id)}
            aria-pressed={track === t.id}
            className={clsx(
              "rounded-full border px-4 py-2 text-[length:var(--type-meta)] font-semibold transition-colors",
              track === t.id
                ? "border-[#212466] bg-[#212466] text-white"
                : "border-[color:var(--rule)] text-[color:var(--text)] hover:border-[#991212] hover:text-[#991212]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-7">
        <h2 className="t-sub">{active.group.title}</h2>
        <ol className="mt-4 grid gap-3">
          {active.group.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 border-b border-[color:var(--rule)] pb-3 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="numeral shrink-0 text-[length:var(--type-meta)] font-bold text-[color:var(--text-muted)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="body-text">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-11">
        <h2 className="t-sub">{constructionRequirements.title}</h2>
        {constructionRequirements.note && (
          <p className="body-text mt-3 max-w-[60ch]">
            {constructionRequirements.note}
          </p>
        )}
        <ol className="mt-4 grid gap-3">
          {constructionRequirements.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 border-b border-[color:var(--rule)] pb-3 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="numeral shrink-0 text-[length:var(--type-meta)] font-bold text-[color:var(--text-muted)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="body-text">{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default RequirementsList;
