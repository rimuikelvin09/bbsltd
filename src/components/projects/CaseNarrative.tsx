"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import MediaFrame from "./MediaFrame";
import { CaseImage } from "@/lib/projects/images";

export interface NarrativeChapter {
  key: string;
  kicker: string;
  title: string;
  body: string[];
  pull?: string;
  caption: string;
  images: CaseImage[];
}

/**
 * THE NARRATIVE: sticky gallery left, chapters scrolling right.
 *
 * The gallery is bound to READING POSITION, not decorated by scroll. It is
 * answering "which picture belongs to the sentence you are on?" - so when
 * you reach the design chapter you are looking at the drawings, and when you
 * reach the result you are looking at the finished building. The comparison
 * the reader wants happens WHILE they are being told what the drawing was
 * for, rather than in a separate section bolted on at the end.
 *
 * WHY THIS IS NOT THE SCROLL-EFFECT PROBLEM WE REMOVED FROM THE SITE:
 *
 *  - position:sticky is pure CSS. No JavaScript, no jank.
 *  - The swap uses IntersectionObserver, which fires a handful of times per
 *    page when a chapter crosses the middle of the viewport. It is NOT a
 *    scroll listener measuring element positions sixty times a second,
 *    which is what actually makes pages stutter.
 *  - The transition animates opacity and transform only, so it composites
 *    on the GPU and never triggers layout.
 *  - Below lg the whole sticky arrangement is OFF and every chapter carries
 *    its own images inline, server-rendered. Half a screen of picture above
 *    half a screen of text is miserable on a phone.
 *
 * THE STICKY COLUMN MUST BE FULL ROW HEIGHT. position:sticky can never
 * travel outside its own containing block, so a column sized to its content
 * unsticks the moment the gallery scrolls past. The column below is a plain
 * grid child with default stretch alignment for exactly that reason - do not
 * add items-start to the grid.
 */
const CaseNarrative: React.FC<{ chapters: NarrativeChapter[] }> = ({
  chapters,
}) => {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [idx, setIdx] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  /**
   * NOT EVERY CHAPTER HAS A PICTURE, and that is normal - the problem and
   * the design chapters are often argument rather than photograph. So the
   * gallery shows the most recent chapter that HAS images, and simply holds
   * while the reader goes through one that does not.
   *
   * The alternative - blanking the frame - is worse twice over: it looks
   * broken, and it empties the left column for exactly the passages the
   * reader spends longest on.
   */
  const galleryIdx = useMemo(() => {
    for (let i = active; i >= 0; i -= 1) {
      if (chapters[i]?.images.length) return i;
    }
    const first = chapters.findIndex((c) => c.images.length);
    return first >= 0 ? first : 0;
  }, [active, chapters]);

  // Gallery change fades the frame down, swaps, and fades it back in.
  useEffect(() => {
    if (galleryIdx === shown) return;
    setSwapping(true);
    timer.current = window.setTimeout(() => {
      setShown(galleryIdx);
      setIdx(0);
      setSwapping(false);
    }, 200);
    return () => window.clearTimeout(timer.current);
  }, [galleryIdx, shown]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const n = Number(en.target.getAttribute("data-chapter"));
          if (!Number.isNaN(n)) setActive(n);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const set = chapters[shown];
  const images = set?.images ?? [];
  const current = images[Math.min(idx, Math.max(images.length - 1, 0))];

  const step = (d: number) => {
    if (images.length < 2) return;
    setSwapping(true);
    window.setTimeout(() => {
      setIdx((i) => (i + d + images.length) % images.length);
      setSwapping(false);
    }, 200);
  };

  const jump = (i: number) => {
    const el = document.querySelector(`[data-chapter="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
      {/* Gallery column. Plain grid child: default stretch alignment is what
          gives sticky somewhere to travel. */}
      <div className="hidden min-w-0 lg:block">
        <div className="sticky top-[calc(var(--header-h,5rem)+1.5rem)]">
          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[color:var(--rule)] transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
              swapping ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {current ? (
              <MediaFrame
                src={current.src}
                kind={current.kind}
                caption={current.caption}
              />
            ) : (
              <MediaFrame kind="photo" caption={set?.caption} />
            )}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={images.length < 2}
              aria-label="Previous image"
              className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-[color:var(--rule)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] disabled:opacity-40"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={images.length < 2}
              aria-label="Next image"
              className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-[color:var(--rule)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] disabled:opacity-40"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <span className="ml-auto text-[length:var(--type-meta)] font-semibold text-[color:var(--text-muted)] [font-variant-numeric:tabular-nums]">
              {images.length ? `${Math.min(idx, images.length - 1) + 1} / ${images.length}` : "-"}
            </span>
          </div>

          {images.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-current={i === idx}
                  aria-label={im.caption ?? `Image ${i + 1}`}
                  className={`relative aspect-[4/3] w-[82px] flex-none overflow-hidden rounded-md border-2 transition-opacity hover:opacity-80 ${
                    i === idx ? "border-[color:var(--accent)]" : "border-transparent"
                  }`}
                >
                  <MediaFrame src={im.src} kind={im.kind} showKind={false} />
                </button>
              ))}
            </div>
          )}

          <p className="mt-3 text-[0.78rem] font-bold leading-[1.4]">
            {set?.caption}
          </p>

          {/* Progress. Answers "how much more of this is there?", which is
              the real anxiety in a long sticky section. */}
          <div className="mt-3 flex gap-1" role="group" aria-label="Jump to a chapter">
            {chapters.map((c, i) => (
              <button
                key={c.key}
                type="button"
                onClick={() => jump(i)}
                aria-current={i === active}
                aria-label={`Chapter ${i + 1}: ${c.caption}`}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === active
                    ? "bg-[color:var(--accent)]"
                    : i < active
                      ? "bg-[color:var(--accent)] opacity-40"
                      : "bg-[color:var(--rule)]"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[0.68rem] text-[color:var(--text-muted)] [font-variant-numeric:tabular-nums]">
            Chapter {active + 1} of {chapters.length}
          </p>
        </div>
      </div>

      {/* Chapters */}
      <div className="flex min-w-0 flex-col gap-12 lg:gap-14">
        {chapters.map((c, i) => (
          <article
            key={c.key}
            data-chapter={i}
            className="scroll-mt-[calc(var(--header-h,5rem)+2rem)]"
          >
            <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-[color:var(--text-muted)]">
              {String(i + 1).padStart(2, "0")} &mdash; {c.kicker}
            </p>
            <h3 className="t-sub mt-2">{c.title}</h3>
            {c.body.map((para) => (
              <p key={para.slice(0, 24)} className="body-text mt-4">
                {para}
              </p>
            ))}
            {c.pull && (
              <p className="t-card mt-5 border-l-[3px] border-[color:var(--accent)] pl-4 font-[family-name:var(--font-display)] leading-[1.35]">
                {c.pull}
              </p>
            )}

            {/* Inline on narrow screens, server-rendered, so the page is
                complete without the sticky gallery or any JavaScript. */}
            {c.images.length > 0 && (
              <div className="mt-5 flex flex-col gap-3 lg:hidden">
                {c.images.map((im) => (
                  <div
                    key={im.src}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[color:var(--rule)]"
                  >
                    <MediaFrame src={im.src} kind={im.kind} caption={im.caption} />
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default CaseNarrative;
