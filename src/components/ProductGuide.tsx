"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { generateSlug } from "@/utils";
import { routerQuestions, routerEntryId } from "@/data/router";

interface ProductGuideProps {
  products: Product[];
}

interface Answered {
  questionId: string;
  optionLabel: string;
}

/**
 * THE GUIDE
 * ---------
 * A launcher that follows you down the products section and releases at its
 * end, opening a short guided exchange that ends in a link.
 *
 * It behaves like a chat and deliberately is not one. There is no text input,
 * because a free-text box invites questions we cannot answer here and then
 * disappoints; every turn is a fixed question with fixed options, so the
 * conversation cannot leave the rails and every path terminates in one of the
 * six products. Nothing is submitted and nobody is contacted - it is
 * navigation wearing a friendlier shape.
 *
 * STICKY, NOT FIXED. It is a sticky last child of the products section, so it
 * rides the bottom of the viewport only while that section is on screen and
 * scrolls away with it. A fixed element would follow the visitor into the
 * testimonials and the footer, where it has nothing to offer.
 *
 * It sits bottom-LEFT: the WhatsApp button and the back-to-top control
 * already occupy the right-hand rail, and stacking three floating controls in
 * one corner is how a page starts to feel infested.
 *
 * Each answer dispatches a `bbs:router` DOM event. One GA4 listener turns
 * that into a breakdown of how much of your traffic has land, needs
 * financing, or is building from abroad - which no page-view report can.
 */
const ProductGuide: React.FC<ProductGuideProps> = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string>(routerEntryId);
  const [trail, setTrail] = useState<Answered[]>([]);
  const [resolvedTitle, setResolvedTitle] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const current = routerQuestions.find((q) => q.id === currentId);
  const resolved = resolvedTitle
    ? products.find((p) => p.productTitle === resolvedTitle)
    : undefined;

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes it, as it would any popover.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // The hero has a "Which one is me?" link at the top of the page. It scrolls
  // here and fires this, so the visitor arrives with the guide already open
  // rather than having to find the launcher.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("bbs:open-guide", onOpen);
    return () => window.removeEventListener("bbs:open-guide", onOpen);
  }, []);

  const choose = useCallback(
    (optionLabel: string, next?: string, resolve?: string) => {
      if (!current) return;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("bbs:router", {
            detail: { question: current.question, answer: optionLabel },
          }),
        );
      }
      setTrail((prev) => [...prev, { questionId: current.id, optionLabel }]);
      if (resolve) setResolvedTitle(resolve);
      else if (next) setCurrentId(next);
    },
    [current],
  );

  const restart = useCallback(() => {
    setTrail([]);
    setResolvedTitle(null);
    setCurrentId(routerEntryId);
  }, []);

  const back = useCallback(() => {
    setResolvedTitle(null);
    setTrail((prev) => {
      const next = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      if (last) setCurrentId(last.questionId);
      return next;
    });
  }, []);

  const step = trail.length + 1;

  return (
    <div className="pointer-events-none sticky bottom-5 z-30 flex justify-start sm:bottom-7">
      <div className="pointer-events-auto w-full max-w-[380px]">
        {open ? (
          <div
            ref={panelRef}
            tabIndex={-1}
            role="region"
            aria-label="Find the right product"
            className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-white shadow-[0_18px_50px_-12px_rgba(23,23,23,0.35)] outline-none"
          >
            <div className="flex items-center justify-between gap-4 bg-[#212466] px-5 py-4">
              <p className="text-[length:var(--type-meta)] font-semibold text-white">
                {resolved ? "Found it" : "Three quick questions"}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* What has been said so far, as a transcript. */}
              {trail.length > 0 ? (
                <ul className="mb-4 flex flex-col gap-2">
                  {trail.map((a, i) => (
                    <li
                      key={`${a.questionId}-${i}`}
                      className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#EFEFF3] px-4 py-2 text-[length:var(--type-meta)] text-[color:var(--text)]"
                    >
                      {a.optionLabel}
                    </li>
                  ))}
                </ul>
              ) : null}

              {resolved ? (
                <div aria-live="polite">
                  <h3 className="t-card text-[#212466]">
                    {resolved.productTitle}
                  </h3>
                  <p className="meta mt-3">{resolved.productVp}</p>
                  <Link
                    href={`/products/${generateSlug(resolved.productTitle)}`}
                    className="btn-pill btn-pill-dark mt-5 w-full text-center"
                  >
                    See {resolved.productTitle}
                  </Link>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={restart}
                      className="link meta font-semibold"
                    >
                      Start again
                    </button>
                    <Link href="/contact" className="link meta font-semibold">
                      Talk to someone
                    </Link>
                  </div>
                </div>
              ) : current ? (
                <div>
                  {trail.length === 0 ? (
                    <p className="body-text mb-4 rounded-2xl rounded-bl-sm bg-[#EFEFF3] px-4 py-3 text-[length:var(--type-meta)]">
                      We build six different ways. Let us narrow it to the one
                      that is yours.
                    </p>
                  ) : null}
                  <p className="meta">
                    Question {step} of {routerQuestions.length}
                  </p>
                  <p
                    className="body-text mt-2 font-semibold text-[color:var(--text)]"
                    aria-live="polite"
                  >
                    {current.question}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {current.options.map((o) => (
                      <li key={o.label}>
                        <button
                          type="button"
                          onClick={() => choose(o.label, o.next, o.resolve)}
                          className="w-full rounded-xl border border-[color:var(--rule)] px-4 py-3 text-left text-[length:var(--type-meta)] leading-snug transition-colors hover:border-[#212466] hover:bg-[#212466] hover:text-white"
                        >
                          {o.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {trail.length > 0 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="link meta mt-4 font-semibold"
                    >
                      Back
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="group flex items-center gap-3 rounded-full border border-[color:var(--rule)] bg-white py-3 pl-5 pr-6 shadow-[0_10px_30px_-10px_rgba(23,23,23,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#212466]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-[length:var(--type-meta)] font-semibold text-[color:var(--text)]">
                Not sure which is yours?
              </span>
              {/* A concrete, small number. "Three questions" is a quantity;
                  "about twenty seconds" is a price, and it is the price the
                  visitor is actually weighing. */}
              <span className="block text-[length:var(--type-eyebrow)] text-[color:var(--text-muted)]">
                Three questions, about twenty seconds
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGuide;
