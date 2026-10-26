"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LearnItem } from "@/types";
import VideoFacade from "./VideoFacade";

/**
 * The items inside one category, with search and a layout switch.
 *
 * LIST AND GRID ARE THE SAME MARKUP. One attribute on the container moves
 * between them, so there is no second template to keep in sync.
 *
 * Below 720px the switch is hidden, because there is nothing to switch:
 * both layouts collapse to one column, and a small thumbnail beside text is
 * unreadable at that width. Phones always get a full-width poster.
 */

type Mode = "list" | "grid";
const STORE_KEY = "bbs:learn:view";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function haystack(i: LearnItem): string {
  return `${i.title} ${i.summary} ${i.topics.join(" ")}`.toLowerCase();
}

interface Props {
  items: LearnItem[];
  categorySlug: string;
  defaultView: Mode;
}

const CategoryList: React.FC<Props> = ({ items, categorySlug, defaultView }) => {
  const [mode, setMode] = useState<Mode>(defaultView);
  const [query, setQuery] = useState("");

  // A remembered layout is a per-viewer convenience, so it belongs in
  // localStorage - and must survive it being unavailable.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORE_KEY);
      if (saved === "list" || saved === "grid") setMode(saved);
    } catch {
      /* private window, blocked storage - keep the default */
    }
  }, []);

  function choose(next: Mode) {
    setMode(next);
    try {
      window.localStorage.setItem(STORE_KEY, next);
    } catch {
      /* nothing to do */
    }
  }

  const prepared = useMemo(
    () => items.map((item) => ({ item, hay: haystack(item) })),
    [items],
  );
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = useMemo(
    () =>
      prepared
        .filter(({ hay }) => terms.every((t) => hay.includes(t)))
        .map(({ item }) => item),
    [prepared, terms],
  );

  const grid = mode === "grid";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative flex min-w-0 flex-[0_1_280px] items-center">
          <svg
            className="pointer-events-none absolute left-[13px] text-[color:var(--text-muted)]"
            width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <circle cx="6.8" cy="6.8" r="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="m10.6 10.6 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this category"
            aria-label="Search within this category"
            className="w-full appearance-none rounded-full border border-[color:var(--rule)] bg-white py-[9px] pl-[38px] pr-4 text-[0.9375rem] text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent)] focus:outline-none"
          />
        </div>

        <span className="font-mono text-[length:var(--type-meta)] tabular-nums text-[color:var(--text-muted)]">
          {terms.length ? `${visible.length} of ${items.length}` : `${items.length} item${items.length === 1 ? "" : "s"}`}
        </span>

        {/* Hidden below 720px: both layouts are identical there. */}
        <span
          role="group"
          aria-label="Layout"
          className="ml-auto hidden overflow-hidden rounded-full border border-[color:var(--rule)] min-[720px]:inline-flex"
        >
          {(["list", "grid"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className={`px-[14px] py-[7px] text-[0.75rem] font-semibold capitalize transition-colors ${
                mode === m ? "bg-[#212466] text-white" : "text-[color:var(--text-muted)]"
              }`}
            >
              {m}
            </button>
          ))}
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="mt-9 rounded-2xl border border-dashed border-[color:var(--rule)] px-6 py-12 text-center">
          <h3>{items.length === 0 ? "Nothing here yet" : `Nothing matches "${query}"`}</h3>
          <p className="mx-auto mt-3 max-w-[48ch] text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
            {items.length === 0
              ? "This category is being written. It will fill from the top."
              : "Try a broader word. Searches that find nothing are logged - they decide what gets written next."}
          </p>
        </div>
      ) : (
        <div
          className={
            grid
              ? "mt-9 grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-9"
          }
        >
          {visible.map((item, index) => (
            <article
              key={item.slug}
              className={
                grid
                  ? "flex min-w-0 flex-col"
                  : "grid grid-cols-1 gap-5 border-t border-[color:var(--rule)] py-6 last:border-b min-[720px]:grid-cols-[260px_1fr] min-[720px]:gap-7"
              }
            >
              {item.form === "video" && item.videoId ? (
                <VideoFacade
                  videoId={item.videoId}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  priority={index < 2}
                />
              ) : item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt=""
                  width={1600}
                  height={900}
                  className="aspect-video w-full rounded-xl object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="block aspect-video w-full rounded-xl bg-gradient-to-br from-[#eceaf0] to-[#f7f5f8]"
                />
              )}

              <div className="min-w-0">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                  {item.form === "download"
                    ? item.fileMeta ?? "PDF"
                    : item.form === "written"
                      ? `${item.readingMinutes ?? 5} min read · ${formatDate(item.publishedAt)}`
                      : formatDate(item.publishedAt)}
                </span>

                <h3 className="mt-2">
                  <Link
                    href={`/learn/${categorySlug}/${item.slug}`}
                    className="transition-colors hover:text-[color:var(--accent)]"
                  >
                    {item.title}
                  </Link>
                </h3>

                {item.draft && (
                  <span className="mt-2 inline-block rounded bg-[#ffeded] px-2 py-[2px] font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[color:var(--crimson)]">
                    Draft
                  </span>
                )}

                <p className="mt-[10px] text-[length:var(--type-meta)] leading-[1.55] text-[color:var(--text-muted)]">
                  {item.summary}
                </p>

                {item.topics.length > 0 && (
                  <div className="mt-[13px] flex flex-wrap gap-x-3 gap-y-1">
                    {item.topics.slice(0, 3).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setQuery(t)}
                        className="font-mono text-[0.6875rem] tracking-[0.05em] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--accent)]"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
