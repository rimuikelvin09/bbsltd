"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import { processStages } from "@/data/process";

/**
 * YOUR CONSTRUCTION ROADMAP
 * -------------------------
 * This section used to be six viewport-heights tall with a pinned pane
 * inside it: scrolling advanced the stage instead of moving the page. It is
 * now an ordinary scrolling list, with all six stages on the page at once -
 * transparency is the point of the section, and hiding five stages behind a
 * click is a strange way to argue that nothing is hidden. Every stage is in
 * the markup, so a crawler reads the whole process.
 *
 * The rail on the left is orientation, not a control surface: it says where
 * you are and lets you jump, but it never takes the scroll away from you. It
 * is a plain list of anchor links, so it works before JavaScript loads.
 *
 * DO NOT PUT overflow-hidden ON THE <section>. It was added once to clip the
 * background image and it silently killed the rail: an overflow-hidden
 * ancestor becomes a scroll container, and position:sticky cannot engage
 * inside one that has no scrollable overflow. The clipping belongs on the
 * background wrapper, which is where it now lives.
 *
 * THE BACKGROUND
 * The photograph drifts against the page as you scroll - the wrapper is
 * taller than the section and is translated by a fraction of how far through
 * the section you are. That is done with a transform rather than
 * `background-attachment: fixed`, which iOS Safari has never handled
 * properly and which repaints on every scroll frame instead of compositing.
 * The work is batched into requestAnimationFrame, only runs while the
 * section is near the viewport, and is skipped entirely under
 * prefers-reduced-motion.
 *
 * Two overlays sit above it and do not move:
 *   1. A radial centred near the top-right corner. That corner is where the
 *      picture is allowed to show; it dissolves to solid navy in every
 *      direction away from it.
 *   2. A linear floor running right-to-left. The radial alone left about
 *      0.85 navy behind the longest lines of body text, which is not enough
 *      over a mid-tone photograph. This layer guarantees roughly 0.95 across
 *      the whole text column and is transparent over the right quarter,
 *      where there are no words. Aesthetics from the first, legibility from
 *      the second.
 * On a phone the single column runs full width and there is no spare corner
 * to give away, so the base radial stays near-opaque and the floor is a
 * no-op; the lg: variants are what open the corner up.
 */

/**
 * How far the photograph travels across one read of the section, as a
 * fraction of the section's height. 0.26 of a 1700px section is about 450px
 * of drift, which is the point at which the effect is actually perceptible
 * rather than merely present.
 */
const PARALLAX_TRAVEL = 0.26;
/**
 * How far past each end of the section the drift is allowed to continue
 * before it is pinned. Keeps the movement from stopping dead at the edges.
 */
const PARALLAX_OVERSHOOT = 0.2;

const pad = (n: number) => (n + 1).toString().padStart(2, "0");

const stageId = (i: number) => `stage-${pad(i)}`;

const ProcessSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);

  // Highlights whichever stage is sitting in the upper third of the
  // viewport. Read-only: nothing here changes the scroll position.
  useEffect(() => {
    const nodes = stageRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // The drift.
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      bg.style.transform = "";
      return;
    }

    let frame = 0;
    let near = false;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      /**
       * Progress across the READ, not across the viewport: 0 when the
       * section's top meets the top of the screen, 1 when its bottom meets
       * the bottom. An earlier version measured how far the section's centre
       * was from the viewport's centre, which is correct but useless here -
       * for a section twice the height of the screen, the whole time you are
       * looking at it that measure only moves through a fifth of its range,
       * so four fifths of the drift was spent off screen and what was left
       * was too small to see.
       */
      const span = rect.height - window.innerHeight;
      const raw = span > 0 ? -rect.top / span : 0;
      const p = Math.min(
        Math.max(raw, -PARALLAX_OVERSHOOT),
        1 + PARALLAX_OVERSHOOT,
      );
      /**
       * Sign matters, and it is the whole effect. Scrolling down moves the
       * page's content UP the screen; for the photograph to sit BEHIND that
       * content it has to move up more slowly, so it is translated DOWN as
       * progress increases, cancelling part of the page's movement. Flip
       * this and the background races the text instead of lagging it, which
       * reads as a glitch rather than as depth.
       */
      const offset = (p - 0.5) * rect.height * PARALLAX_TRAVEL;
      bg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (near && !frame) frame = window.requestAnimationFrame(update);
    };

    // No scroll maths at all while the section is nowhere near the screen.
    const gate = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) update();
      },
      { rootMargin: "200px 0px" },
    );
    gate.observe(section);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      gate.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="surface-dark relative w-full py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        {/* Taller than the section, so the drift never exposes an edge. */}
        <div
          ref={bgRef}
          className="absolute inset-x-0 -top-[24%] h-[148%] will-change-transform"
        >
          <Image
            src="/images/process-bg.jpg"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
        </div>

        {/* 1. The shape: brightest at the top-right corner. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_70%_at_86%_20%,rgba(33,36,102,0.90)_0%,rgba(33,36,102,0.96)_34%,rgba(33,36,102,1)_66%)] lg:bg-[radial-gradient(ellipse_55%_95%_at_95%_26%,rgba(33,36,102,0.28)_0%,rgba(33,36,102,0.58)_35%,rgba(33,36,102,0.95)_65%,rgba(33,36,102,1)_85%)]" />

        {/* 2. The join. Solid navy at the very top, clearing by about a
               sixth of the way down, so the photograph rises into the
               section instead of butting up against the hero at a hard
               line. The radial's centre sits below this band. */}
        <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(to_bottom,rgba(33,36,102,1)_0%,rgba(33,36,102,0.86)_42%,rgba(33,36,102,0)_100%)]" />

        {/* 3. The legibility floor across the text column. */}
        <div className="absolute inset-0 lg:bg-[linear-gradient(to_left,rgba(33,36,102,0)_0%,rgba(33,36,102,0)_18%,rgba(33,36,102,0.55)_26%,rgba(33,36,102,0.92)_36%,rgba(33,36,102,1)_48%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-muted display-shadow">The process</p>
          <h2 className="display-shadow mt-5">Your construction roadmap</h2>
          <p className="lede display-shadow mt-6">
            Six stages, in order, with what happens at each one. You will know
            which stage your project is in at any point, and what has to
            finish before the next begins.
          </p>
        </div>

        <div className="mt-12 lg:mt-14 lg:grid lg:grid-cols-[190px_1fr] lg:gap-12 xl:gap-16">
          {/* Orientation rail - desktop only. Plain anchors, so it works
              without JavaScript and a crawler follows it. */}
          <nav
            aria-label="Process stages"
            className="hidden lg:block lg:self-start"
            style={{
              position: "sticky",
              top: "calc(var(--header-h, 5rem) + 2.5rem)",
            }}
          >
            <ol className="flex flex-col gap-4 border-l border-[color:var(--rule)]">
              {processStages.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.name} className="relative">
                    {on ? (
                      <span
                        aria-hidden="true"
                        className="absolute -left-px top-0 h-full w-px bg-[color:var(--accent)]"
                      />
                    ) : null}
                    <a
                      href={`#${stageId(i)}`}
                      aria-current={on ? "step" : undefined}
                      className="block py-1 pl-5 transition-colors duration-200"
                    >
                      <span
                        className={`numeral mb-1 block text-[length:var(--type-eyebrow)] ${
                          on
                            ? "text-[color:var(--accent)]"
                            : "text-[color:var(--text-muted)]"
                        }`}
                      >
                        {pad(i)}
                      </span>
                      <span
                        className={`block text-[length:var(--type-meta)] leading-snug ${
                          on
                            ? "font-semibold text-[color:var(--text)]"
                            : "text-[color:var(--text-muted)]"
                        }`}
                      >
                        {s.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* The stages themselves. All six, always. */}
          <ol className="flex flex-col">
            {processStages.map((s, i) => (
              <li
                key={s.name}
                id={stageId(i)}
                ref={(node) => {
                  stageRefs.current[i] = node;
                }}
                className="scroll-mt-32 border-t border-[color:var(--rule)] py-7 first:border-t-0 first:pt-0 sm:py-8 lg:py-9"
              >
                <div className="flex gap-5 sm:gap-7">
                  <span
                    aria-hidden="true"
                    className="numeral shrink-0 text-[1.5rem] leading-none text-white/30 sm:text-[1.875rem] lg:w-[74px]"
                  >
                    {pad(i)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="t-sub">{s.name}</h3>
                    <p className="body-text mt-3 max-w-xl">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
