"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LearnItem } from "@/types";

/**
 * SEARCH ACROSS THE WHOLE HUB
 *
 * Client-side over data the page already has. No index, no service, no
 * extra JavaScript on any other page - the items are server-rendered into
 * this one and filtered in the browser.
 *
 * That is not a shortcut. Title, summary and topics for the entire library
 * is a few kilobytes; filtering it here is instant, works offline, costs
 * nothing to run and cannot return a stale result. Past roughly three
 * hundred entries, swap the matcher for a prebuilt index (MiniSearch, ~7KB)
 * and nothing else about this component changes.
 *
 * It is scoped to the hub ON PURPOSE. Site-wide search over thirty
 * destinations would compete with the navigation rather than help it; the
 * only place with enough content to hunt through is this one.
 */

interface Props {
  items: LearnItem[];
  categoryTitles: Record<string, string>;
  /** Shown under the field before anyone types. */
  placeholder?: string;
}

const MAX_RESULTS = 8;
/** One character matches almost everything, which is noise, not help. */
const MIN_QUERY = 2;

function haystack(i: LearnItem): string {
  return `${i.title} ${i.summary} ${i.topics.join(" ")}`.toLowerCase();
}

const HubSearch: React.FC<Props> = ({
  items,
  categoryTitles,
  placeholder = "Search everything — costs, approvals, financing, the law",
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prepared = useMemo(
    () => items.map((item) => ({ item, hay: haystack(item) })),
    [items],
  );

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const ready = query.trim().length >= MIN_QUERY;

  const results = useMemo(() => {
    if (!ready) return [];
    return prepared
      // Every term must appear somewhere: narrowing, not fuzzy guessing.
      // Someone typing two words means both, and means it.
      .filter(({ hay }) => terms.every((t) => hay.includes(t)))
      .map(({ item }) => item)
      .slice(0, MAX_RESULTS);
  }, [prepared, terms, ready]);

  const open = focused && ready;

  function go(item: LearnItem) {
    router.push(`/learn/${item.category}/${item.slug}`);
    setQuery("");
    setFocused(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("");
      e.currentTarget.blur();
      return;
    }
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active] ?? results[0]);
    }
  }

  return (
    <div className="relative w-full max-w-[560px]">
      <div className="relative flex items-center">
        <svg
          className="pointer-events-none absolute left-[18px] text-[color:var(--text-muted)]"
          width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <circle cx="6.8" cy="6.8" r="5" stroke="currentColor" strokeWidth="1.6" />
          <path d="m10.6 10.6 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <input
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls="hub-search-results"
          aria-autocomplete="list"
          aria-label="Search the Learn hub"
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onFocus={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current);
            setFocused(true);
          }}
          // A click on a result fires blur before the link navigates, so the
          // close is deferred by a tick rather than racing it.
          onBlur={() => {
            blurTimer.current = setTimeout(() => setFocused(false), 150);
          }}
          onKeyDown={onKeyDown}
          className="w-full appearance-none rounded-full border border-[color:var(--rule)] bg-[color:var(--surface)] py-[14px] pl-[46px] pr-5 text-[1rem] text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent)] focus:outline-none"
        />
      </div>

      {open && (
        <div
          id="hub-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] shadow-[0_18px_40px_-20px_rgba(23,23,23,0.35)]"
        >
          {results.length === 0 ? (
            <div className="px-5 py-7 text-center">
              <p className="text-[0.9375rem] font-semibold">
                Nothing for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mx-auto mt-2 max-w-[42ch] text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
                {/* Worth saying out loud: a search that finds nothing is a
                    commissioning brief, not a dead end. */}
                We log every search that comes up empty. A question several
                people ask is the next thing we write.
              </p>
            </div>
          ) : (
            <ul className="m-0 list-none p-[6px]">
              {results.map((item, i) => (
                <li key={`${item.category}/${item.slug}`}>
                  <Link
                    href={`/learn/${item.category}/${item.slug}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      setQuery("");
                      setFocused(false);
                    }}
                    className={`block rounded-xl px-4 py-3 transition-colors ${
                      i === active ? "bg-[rgba(33,36,102,0.07)]" : ""
                    }`}
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                      {categoryTitles[item.category] ?? item.category}
                      {item.draft && " · Draft"}
                    </span>
                    <span className="mt-[3px] block text-[0.9375rem] font-semibold text-[color:var(--text)]">
                      {item.title}
                    </span>
                    <span className="mt-[2px] line-clamp-1 block text-[0.8125rem] text-[color:var(--text-muted)]">
                      {item.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="border-t border-[color:var(--rule)] px-4 py-[10px] font-mono text-[0.68rem] text-[color:var(--text-muted)]">
            {results.length > 0
              ? `${results.length} of ${items.length} · ↑↓ to move, Enter to open`
              : `Searching ${items.length} published items`}
          </p>
        </div>
      )}
    </div>
  );
};

export default HubSearch;
