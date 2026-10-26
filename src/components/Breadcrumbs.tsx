import React from "react";
import Link from "next/link";
import { siteDetails } from "@/data/siteDetails";

/**
 * BREADCRUMBS
 *
 * The inner pages lose their hero, which means this is the only thing
 * telling a visitor where they landed - and a large share of them arrive
 * from search straight onto an inner page, never seeing the home page.
 *
 * The LAST crumb is the current page and is rendered as text, not a link.
 * A crumb that navigates to itself is a small lie about where a click goes.
 *
 * It also emits BreadcrumbList structured data, which Google renders in
 * the search result in place of the raw URL - free and visible on every
 * product and article listing.
 */

export interface Crumb {
  label: string;
  /** Omitted on the final crumb. */
  href?: string;
}

const BASE = siteDetails.siteUrl.replace(/\/+$/, "");

const Breadcrumbs: React.FC<{ trail: Crumb[]; className?: string }> = ({
  trail,
  className = "",
}) => {
  if (trail.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${BASE}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-x-[9px] gap-y-1 p-0 font-mono text-[0.78rem] text-[color:var(--text-muted)]">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-[9px]">
              {c.href && !last ? (
                <Link href={c.href} className="text-[color:var(--accent)] hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-[color:var(--text)]">
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden="true" className="opacity-50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
