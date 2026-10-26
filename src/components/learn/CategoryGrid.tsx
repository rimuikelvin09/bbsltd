import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LearnCategorySummary } from "@/types";

/**
 * The six cards on /learn.
 *
 * A card states what it holds AND how much of it there is. Four of the six
 * are empty today, and a grid where four cards lead nowhere reads as
 * abandoned - so an empty category says so and does not link. Honest, keeps
 * the breadth visible, and puts a deadline where it can be seen.
 */

/**
 * Only 3D Models announces anything about itself, and only because it is
 * genuinely later than the rest. Everything else speaks as if it is live:
 * telling a visitor which parts of your site are unfinished invites them to
 * judge the whole thing by the gaps. What is outstanding belongs in the
 * backlog, not on the page.
 */
function state(c: LearnCategorySummary): { label: string; live: boolean } | null {
  if (c.parked) return { label: "Coming soon", live: false };
  return null;
}

function countLabel(c: LearnCategorySummary): string {
  if (c.parked || c.count === 0) return "";
  if (c.form === "video") return `${c.count} episode${c.count === 1 ? "" : "s"}`;
  if (c.form === "download") return `${c.count} guide${c.count === 1 ? "" : "s"}`;
  return `${c.count} published`;
}

const Card: React.FC<{ c: LearnCategorySummary; n: number }> = ({ c, n }) => {
  const s = state(c);

  return (
    <>
      {c.image ? (
        <Image
          src={c.image}
          alt=""
          width={1600}
          height={900}
          className="mb-[18px] aspect-video w-full rounded-[9px] object-cover"
        />
      ) : (
        // No file in public/images/learnimages yet. A drawn panel rather
        // than a broken frame - see lib/learn/images.ts.
        <span
          aria-hidden="true"
          className="mb-[18px] block aspect-video w-full rounded-[9px] bg-gradient-to-br from-[#eceaf0] to-[#f7f5f8]"
        />
      )}

      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-[color:var(--text-muted)]">
        {String(n).padStart(2, "0")}
      </span>

      <h3 className="mt-3">{c.title}</h3>

      <p className="mt-[10px] text-[0.9375rem] leading-[1.5] text-[color:var(--text-muted)]">
        {c.blurb}
      </p>

      <span className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="font-mono text-[0.8125rem] tabular-nums text-[color:var(--text-soft)]">
          {countLabel(c)}
        </span>
        {s && (
          <span className="rounded-full border border-[color:var(--rule)] px-[9px] py-[3px] font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
            {s.label}
          </span>
        )}
      </span>
    </>
  );
};

const CategoryGrid: React.FC<{ categories: LearnCategorySummary[] }> = ({
  categories,
}) => (
  <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((c, i) => {
      const inner = <Card c={c} n={i + 1} />;
      const base =
        "flex min-w-0 flex-col rounded-[14px] border p-6 text-left transition-colors";

      // Nothing behind it yet, so it is not a link. A disabled-looking card
      // that still navigates is worse than one that plainly does not.
      return c.parked ? (
        <div
          key={c.slug}
          className={`${base} border-[color:var(--rule)] bg-white opacity-[0.78]`}
        >
          {inner}
        </div>
      ) : (
        <Link
          key={c.slug}
          href={`/learn/${c.slug}`}
          className={`${base} border-[color:var(--rule)] bg-white hover:border-[color:var(--accent)]`}
        >
          {inner}
        </Link>
      );
    })}
  </div>
);

export default CategoryGrid;
