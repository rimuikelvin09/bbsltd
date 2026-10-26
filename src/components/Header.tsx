"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineXMark, HiBars3, HiChevronDown } from "react-icons/hi2";

import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { Product } from "@/types";
import { siteDetails } from "@/data/siteDetails";
import { buildNavigation, navCta, NavEntry } from "@/data/navigation";

/**
 * THE HEADER
 *
 * ONE VISUAL STATE. It used to be transparent at the top and white once
 * scrolled, which meant two sets of link colours, two logo files and a
 * flash between them - and it is why the links were unreadable over a
 * hero. It is now a frosted white bar at every scroll position, with a
 * wash from the right that follows the theme. The logo is always the
 * coloured mark.
 *
 * PANELS OPEN ON CLICK, NOT HOVER. A hover menu fires when a cursor
 * crosses it on the way somewhere else, forcing a decision on someone who
 * never asked for one. Click opens only when wanted, behaves identically
 * on touch, and needs no safe-triangle geometry.
 *
 * The auto-hide on scroll is kept - it is a separate behaviour from the
 * colour swap and it gives content the whole viewport.
 */

const HIDE_AFTER_IDLE_MS = 2500;
const TOP_THRESHOLD = 12;

interface HeaderProps {
  products: Product[];
}

const Header: React.FC<HeaderProps> = ({ products }) => {
  const nav = buildNavigation(products);

  const [drawer, setDrawer] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdOpen = useRef(false);
  const anyMenuOpen = useRef(false);

  anyMenuOpen.current = drawer || openPanel !== null;

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const armIdle = useCallback(() => {
    clearIdle();
    idleTimer.current = setTimeout(() => {
      idleTimer.current = null;
      if (window.scrollY > TOP_THRESHOLD && !holdOpen.current && !anyMenuOpen.current) {
        setIsHidden(true);
      }
    }, HIDE_AFTER_IDLE_MS);
  }, [clearIdle]);

  // Publish the height so pages can clear a fixed bar exactly. Forgetting
  // this is what once put the logo through a page heading.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= TOP_THRESHOLD) {
        setIsHidden(false);
        clearIdle();
      } else if (y > last + 6) {
        if (!anyMenuOpen.current && !holdOpen.current) setIsHidden(true);
        clearIdle();
      } else if (y < last - 6) {
        setIsHidden(false);
        armIdle();
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
    };
  }, [armIdle, clearIdle]);

  // Escape closes whatever is open, and a panel never survives a route change.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPanel(null);
      setDrawer(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // A drawer behind a scrolling page is a trap.
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const closeAll = () => {
    setOpenPanel(null);
    setDrawer(false);
    setOpenSection(null);
  };

  const panelFor = (entry: NavEntry) =>
    entry.columns && entry.columns.length > 0 ? entry.columns : null;

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={() => {
          holdOpen.current = true;
          setIsHidden(false);
          clearIdle();
        }}
        onMouseLeave={() => {
          holdOpen.current = false;
          armIdle();
        }}
        className={`fixed left-0 right-0 top-0 z-[60] w-full transition-transform duration-500 ease-out motion-reduce:transition-none ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          // White base plus a radial from the right that follows the theme.
          // Frosted rather than transparent, so links stay legible over
          // whatever sits behind them.
          background:
            "radial-gradient(120% 180% at 100% 50%, var(--head-wash) 0%, rgba(255,255,255,0) 58%), var(--head-base)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <Container>
          <div className="flex items-center gap-4 py-3">
            {/* Always the coloured mark. No swap, no second asset. */}
            <Link href="/" onClick={closeAll} className="flex flex-none items-center" aria-label={siteDetails.siteName}>
              <Image
                src={siteDetails.siteLogo}
                alt={siteDetails.siteName}
                width={150}
                height={38}
                priority
                className="h-auto w-[118px] object-contain sm:w-[140px]"
              />
            </Link>

            <nav className="ml-auto hidden items-center gap-1 min-[1040px]:flex" aria-label="Main">
              {nav.map((entry) => {
                const cols = panelFor(entry);
                const open = openPanel === entry.label;

                if (!cols) {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href ?? "/"}
                      className="rounded-[9px] px-[15px] py-3 text-[0.9375rem] font-semibold text-[#212466] transition-colors hover:bg-[rgba(33,36,102,0.07)]"
                    >
                      {entry.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={entry.label}
                    type="button"
                    aria-expanded={open}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPanel(open ? null : entry.label);
                    }}
                    className={`inline-flex items-center gap-[6px] rounded-[9px] px-[15px] py-3 text-[0.9375rem] font-semibold text-[#212466] transition-colors hover:bg-[rgba(33,36,102,0.07)] ${
                      open ? "bg-[rgba(33,36,102,0.1)]" : ""
                    }`}
                  >
                    {entry.label}
                    <HiChevronDown
                      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </nav>

            {/* Outside the nav: the nav collapses on mobile and a toggle
                that vanishes with it has no home where people use it most. */}
            <ThemeToggle className="ml-auto flex-none border-[#212466]/30 text-[#212466] min-[1040px]:ml-2" />

            <Link
              href={navCta.href}
              className="ml-2 hidden whitespace-nowrap rounded-full bg-[#212466] px-[22px] py-[11px] text-[0.9375rem] font-semibold text-white min-[1040px]:inline-block"
            >
              {navCta.label}
            </Link>

            <button
              type="button"
              onClick={() => setDrawer((v) => !v)}
              aria-label={drawer ? "Close menu" : "Open menu"}
              aria-expanded={drawer}
              className="ml-2 grid h-[42px] w-[42px] flex-none place-items-center rounded-[10px] border border-[color:var(--rule)] text-[#212466] min-[1040px]:hidden"
            >
              {drawer ? <HiOutlineXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
            </button>
          </div>
        </Container>

        {/* MEGA PANELS */}
        {nav.map((entry) => {
          const cols = panelFor(entry);
          if (!cols || openPanel !== entry.label) return null;

          return (
            <div
              key={`panel-${entry.label}`}
              className="absolute inset-x-0 top-full hidden border-b border-[color:var(--rule)] bg-white shadow-[0_18px_40px_-24px_rgba(23,23,23,0.35)] min-[1040px]:block"
            >
              <Container>
                <div
                  className={`grid gap-7 py-8 sm:gap-10 ${
                    cols.length >= 3 ? "lg:grid-cols-3" : cols.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"
                  }`}
                >
                  {cols.map((col) => (
                    <div key={col.heading} className="min-w-0">
                      <p className="mb-3 border-b border-[color:var(--rule)] pb-[10px] font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                        {col.heading}
                      </p>
                      <ul className="grid list-none gap-[2px] p-0">
                        {col.links.map((l) =>
                          l.soon ? (
                            <li key={l.label}>
                              {/* Visible and marked. The breadth is part of
                                  the pitch; a silent gap reads as oversight. */}
                              <span className="-mx-[11px] block rounded-lg px-[11px] py-[9px] text-[0.9375rem] font-semibold text-[color:var(--text-muted)]">
                                {l.label}
                                <span className="ml-2 rounded-full border border-[color:var(--rule)] px-[7px] py-px align-middle font-mono text-[0.58rem] uppercase tracking-[0.1em]">
                                  {l.soonLabel ?? "Soon"}
                                </span>
                                {l.blurb && (
                                  <span className="mt-px block text-[0.8125rem] font-normal">{l.blurb}</span>
                                )}
                              </span>
                            </li>
                          ) : (
                            <li key={l.label}>
                              <Link
                                href={l.href}
                                onClick={closeAll}
                                // Fitts: the whole row is the target.
                                className="-mx-[11px] block rounded-lg px-[11px] py-[9px] text-[0.9375rem] font-semibold text-[#212466] transition-colors hover:bg-[rgba(33,36,102,0.07)] hover:text-[#991212]"
                              >
                                {l.label}
                                {l.blurb && (
                                  <span className="mt-px block text-[0.8125rem] font-normal text-[color:var(--text-muted)]">
                                    {l.blurb}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          );
        })}
      </header>

      {/* Click-anywhere-to-close. The other half of why click beats hover:
          dismissal is explicit too. */}
      {openPanel && (
        <div
          className="fixed inset-0 z-[55] hidden bg-[rgba(23,23,23,0.18)] min-[1040px]:block"
          onClick={() => setOpenPanel(null)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE DRAWER. A sibling of <header>, never a child: the header is
          transformed when it hides, and a transformed ancestor becomes the
          containing block for fixed descendants. */}
      {drawer && (
        <>
          <div
            className="fixed inset-0 z-[65] bg-[rgba(23,23,23,0.35)] min-[1040px]:hidden"
            onClick={closeAll}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-[380px] flex-col bg-white shadow-xl min-[1040px]:hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-5 py-4">
              <Image
                src={siteDetails.siteLogo}
                alt={siteDetails.siteName}
                width={130}
                height={34}
                className="h-auto w-[118px] object-contain"
              />
              <button
                type="button"
                onClick={closeAll}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-[10px] border border-[color:var(--rule)] text-[#212466]"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Home lives here and not on the desktop bar: vertical space
                  is free, and the logo-is-home convention is less universal
                  than desktop designers assume. */}
              <Link
                href="/"
                onClick={closeAll}
                className="block border-b border-[color:var(--rule)] py-[14px] text-[1.0625rem] font-semibold text-[#212466]"
              >
                Home
              </Link>

              {nav.map((entry) => {
                const cols = panelFor(entry);
                const open = openSection === entry.label;

                if (!cols) {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href ?? "/"}
                      onClick={closeAll}
                      className="block border-b border-[color:var(--rule)] py-[14px] text-[1.0625rem] font-semibold text-[#212466]"
                    >
                      {entry.label}
                    </Link>
                  );
                }

                return (
                  <div key={entry.label} className="border-b border-[color:var(--rule)]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenSection(open ? null : entry.label)}
                      className="flex w-full items-center justify-between py-[14px] text-left text-[1.0625rem] font-semibold text-[#212466]"
                    >
                      {entry.label}
                      <HiChevronDown
                        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    {open && (
                      <div className="pb-3">
                        {entry.href && (
                          <Link
                            href={entry.href}
                            onClick={closeAll}
                            className="block py-[10px] text-[0.9375rem] font-semibold text-[#991212]"
                          >
                            All {entry.label.toLowerCase()}
                          </Link>
                        )}
                        {cols.map((col) =>
                          col.links.map((l) =>
                            l.soon ? (
                              <span
                                key={l.label}
                                className="block py-[10px] text-[0.9375rem] text-[color:var(--text-muted)]"
                              >
                                {l.label}
                                <span className="ml-2 rounded-full border border-[color:var(--rule)] px-[7px] py-px font-mono text-[0.58rem] uppercase tracking-[0.1em]">
                                  {l.soonLabel ?? "Soon"}
                                </span>
                              </span>
                            ) : (
                              <Link
                                key={l.label}
                                href={l.href}
                                onClick={closeAll}
                                className="block py-[10px] text-[0.9375rem] text-[#212466]"
                              >
                                {l.label}
                              </Link>
                            ),
                          ),
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href={navCta.href}
                onClick={closeAll}
                className="mt-6 block rounded-full bg-[#212466] px-6 py-[13px] text-center text-[0.9375rem] font-semibold text-white"
              >
                {navCta.label}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
