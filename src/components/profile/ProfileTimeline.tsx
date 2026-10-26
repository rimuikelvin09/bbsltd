import React from "react";
import clsx from "clsx";
import { TimelineEntry } from "@/data/profile";

/**
 * PROFILE TIMELINE
 *
 * One axis, four nodes, copy alternating above and below it.
 *
 * The reference design (Appinio) carries a rising growth curve behind the
 * axis with a measured y-axis. We have no equivalent metric we can publish,
 * so there is no curve here - an unlabelled rising line is a claim nobody
 * can check, which is the opposite of what this page argues.
 *
 * GRID-ROWS 1fr 0 1fr is the trick that makes it work: the two label rows
 * are forced to exactly equal height, so the axis at top-1/2 lands on the
 * row boundary no matter how long any one entry runs. With auto rows the
 * axis drifts off the dots as soon as one entry has more copy than another.
 *
 * Nodes sit at even intervals rather than on a true time axis. True spacing
 * would leave a nine-year void on the left and crush 2024 and 2026 into the
 * last 14% of the width.
 *
 * Colours come from the band tokens, so the whole thing inverts with the
 * palette toggle without naming a single literal.
 */
const ProfileTimeline: React.FC<{ entries: TimelineEntry[] }> = ({
  entries,
}) => (
  <div className="mt-12 sm:mt-16">
    {/* Wide screens: horizontal axis. */}
    <div className="relative hidden min-h-[470px] grid-cols-4 grid-rows-[1fr_0_1fr] gap-x-7 lg:grid">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px bg-[color:var(--rule)]"
      />

      {entries.map((entry, i) => {
        const above = i % 2 === 1;
        return (
          <div
            key={entry.year}
            style={{ gridColumn: i + 1 }}
            className={clsx(
              "relative flex min-w-0 flex-col",
              above ? "row-start-1 justify-end pb-10" : "row-start-3 pt-10",
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                "absolute left-0 z-20 h-[13px] w-[13px] rounded-full border-[2.5px] border-[color:var(--accent)] bg-[color:var(--band)]",
                above ? "-bottom-[6.5px]" : "-top-[6.5px]",
              )}
            />
            <span
              aria-hidden="true"
              className={clsx(
                "absolute left-[6px] z-10 h-10 w-px bg-[color:var(--rule)]",
                above ? "bottom-0" : "top-0",
              )}
            />

            <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-none [font-variant-numeric:tabular-nums]">
              {entry.year}
            </p>
            <p className="mt-[0.55rem] text-[length:var(--type-body)] font-bold text-[color:var(--accent)]">
              {entry.title}
            </p>
            <p className="mt-[0.55rem] max-w-[34ch] text-[length:var(--type-meta)] leading-[1.55] text-[color:var(--text-muted)]">
              {entry.body}
            </p>
          </div>
        );
      })}
    </div>

    {/* Narrow screens: the same four entries down a rail. */}
    <ol className="relative m-0 list-none p-0 lg:hidden">
      {entries.map((entry, i) => (
        <li key={entry.year} className="relative pb-8 pl-8 last:pb-0">
          {i < entries.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1 top-3 w-px bg-[color:var(--rule)]"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute left-[2px] top-[0.4rem] h-[9px] w-[9px] rounded-full border-[2.5px] border-[color:var(--accent)] bg-[color:var(--band)]"
          />
          <p className="font-[family-name:var(--font-display)] text-[1.6rem] font-bold leading-none [font-variant-numeric:tabular-nums]">
            {entry.year}
          </p>
          <p className="mt-[0.55rem] text-[length:var(--type-body)] font-bold text-[color:var(--accent)]">
            {entry.title}
          </p>
          <p className="mt-[0.55rem] text-[length:var(--type-meta)] leading-[1.55] text-[color:var(--text-muted)]">
            {entry.body}
          </p>
        </li>
      ))}
    </ol>
  </div>
);

export default ProfileTimeline;
