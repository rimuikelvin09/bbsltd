"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { processStages } from "@/data/process";

/**
 * How much page scroll each stage gets. The section is this tall per
 * stage, and a full-viewport pane stays pinned inside it, so scrolling
 * advances the stage instead of moving the page. Lower it if the section
 * feels too long to get through.
 */
const VH_PER_STAGE = 100;

const pad = (n: number) => (n + 1).toString().padStart(2, "0");

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const travelled = -el.getBoundingClientRect().top;
      const progress = Math.min(Math.max(travelled / scrollable, 0), 1);
      const index = Math.min(
        processStages.length - 1,
        Math.floor(progress * processStages.length)
      );
      setActive((prev) => (prev === index ? prev : index));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Clicking a stage scrolls to the point in the section where it is shown.
  const goTo = useCallback((index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const offset =
      el.offsetTop + (scrollable * (index + 0.5)) / processStages.length;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  const stage = processStages[active] ?? processStages[0];
  const progress = ((active + 1) / processStages.length) * 100;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="surface-dark relative w-full"
      style={{ height: `${processStages.length * VH_PER_STAGE}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Container className="py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-muted">The process</p>
            <h2 className="mt-5">Seven stages. You see every one of them coming.</h2>
          </div>

          {/* Stepper rail, with a bar showing how far through you are */}
          <div className="mt-10 lg:mt-14">
            <div className="h-px w-full bg-[color:var(--rule)]">
              <div
                className="h-px bg-[color:var(--accent)] transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 lg:grid-cols-7">
              {processStages.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={on ? "step" : undefined}
                    className="text-left transition-colors duration-200"
                  >
                    <span
                      className={`numeral mb-1.5 block text-[length:var(--type-meta)] ${
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* The active stage */}
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-12 flex flex-col lg:mt-16 lg:flex-row lg:items-start lg:gap-16"
          >
            <div
              aria-hidden="true"
              className="numeral shrink-0 text-[3.5rem] leading-[0.82] text-white/[0.13] sm:text-[5rem] lg:w-[170px] lg:text-[8rem]"
            >
              {pad(active)}
            </div>
            <div className="mt-5 lg:mt-0">
              <h3 className="t-sub">{stage.name}</h3>
              <p className="lede mt-5 max-w-3xl">{stage.body}</p>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default ProcessSection;
