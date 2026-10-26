import React from "react";
import Link from "next/link";

/**
 * THE COMING SOON PANEL
 *
 * One treatment, used everywhere something is deliberately not live yet, so
 * a visitor who meets it twice recognises it rather than wondering whether
 * the second one is broken.
 *
 * TWO RULES, both learned the hard way on this site:
 *
 *  1. SAY WHY. "Coming soon" with no reason reads as abandoned. Every use
 *     of this gives an actual reason, and the reason is always the same
 *     kind: we would rather it were right than early. That is the brand
 *     argument, so saying it costs nothing and earns something.
 *
 *  2. ALWAYS OFFER SOMEWHERE TO GO. A dead end is where a visit ends. Each
 *     one points at the nearest thing that IS finished.
 *
 * Pages using this must also set `robots: { index: false }` - a holding
 * page in the index is a holding page someone arrives on from Google.
 */
const ComingSoon: React.FC<{
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}> = ({ title, body, primary, secondary }) => (
  <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--rule)] px-6 py-14 text-center">
    <p className="eyebrow">Coming soon</p>
    <h2 className="t-sub mx-auto mt-4 max-w-[26ch]">{title}</h2>
    <p className="mx-auto mt-4 max-w-[54ch] text-[length:var(--type-meta)] leading-relaxed text-[color:var(--text-muted)]">
      {body}
    </p>
    {(primary || secondary) && (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {primary && (
          <Link href={primary.href} className="btn-pill btn-pill-dark">
            {primary.label}
          </Link>
        )}
        {secondary && (
          <Link
            href={secondary.href}
            className="btn-pill border border-[color:var(--rule)]"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    )}
  </div>
);

export default ComingSoon;
