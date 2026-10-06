"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import dynamic from "next/dynamic";
// The enquiry modal and its country and county lists are ~500 lines that
// nobody loads unless they open the form. Keeping it out of the initial
// bundle costs nothing and is the single biggest win available here.
const LeadForm = dynamic(() => import("@/components/LeadForm"), {
  ssr: false,
});

/**
 * JENGA KWAKO AFFORDABILITY
 * -------------------------
 * ONE QUESTION, ONE NUMBER, ONE ACTION.
 *
 * The previous version put the controls in one column and a summary card in
 * the other, and then printed the comparison twice - once as a two-row table
 * on the left and again as a line in the card. Two columns of figures for a
 * tool that answers a single question is noise, and noise is what stops
 * people acting. It is now a single centred column, so cause sits directly
 * above effect at every screen width: move a slider, the number under it
 * changes, and there is nowhere else for the eye to go.
 *
 * What was removed and why:
 *   - "Of which interest": true, and it invites the reader to dwell on the
 *     cost at the moment we want them to move.
 *   - "Total repaid": same problem in a politer suit. KES 13.1M against a
 *     KES 5M loan is a discouraging number to meet mid-decision.
 *   - The duplicate comparison block.
 * Nothing is concealed by leaving them out: the official amortization table
 * is linked directly beneath, and it carries every figure for every
 * combination on offer.
 *
 * TERMS, from /public/documents/amortizationtable.pdf. Do not change without
 * the client: 9.5% p.a. FIXED on reducing balance, KES 1,000,000 to
 * KES 10,500,000, 1 to 25 years.
 *
 * The arithmetic is the standard amortisation formula M = P*r/(1-(1+r)^-n),
 * checked against six cells of that table and matching to the cent.
 */

/** Annual rate on reducing balance. Fixed for the whole term. */
const ANNUAL_RATE = 0.095;
/**
 * Average commercial bank lending rate published by the Central Bank of
 * Kenya, July 2026. Update this and MARKET_LABEL together - the month is
 * printed on the page, so a stale figure here becomes visibly stale rather
 * than quietly wrong.
 */
const MARKET_RATE = 0.1439;
const MARKET_LABEL = "14.39%";

const MAX_LOAN = 10_500_000;
const MIN_LOAN = 1_000_000;
const LOAN_STEP = 100_000;
const MAX_YEARS = 25;

const money = (n: number) => `KES ${Math.round(n).toLocaleString("en-US")}`;

const monthlyPayment = (principal: number, rate: number, years: number) => {
  const r = rate / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
};

const MortgageCalculator: React.FC = () => {
  const [loan, setLoan] = useState(5_000_000);
  const [years, setYears] = useState(25);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const uid = useId();

  const { monthly, extraInterestAtMarket } = useMemo(() => {
    const months = years * 12;
    const ours = monthlyPayment(loan, ANNUAL_RATE, years);
    const market = monthlyPayment(loan, MARKET_RATE, years);
    /**
     * The DIFFERENCE in interest, and only the difference. Both loans repay
     * the same principal, so the gap between their totals is entirely
     * interest - no need to state what either one pays, and stating ours
     * would hand the reader a large discouraging number at the moment we
     * want them to act. What they see is what the rate saves them.
     */
    return {
      monthly: ours,
      extraInterestAtMarket: (market - ours) * months,
    };
  }, [loan, years]);

  const term = `${years} ${years === 1 ? "year" : "years"}`;

  const prefill = [
    "Jenga Kwako application started from the calculator.",
    `Amount: ${money(loan)}`,
    `Term: ${term}`,
    `Indicative monthly repayment at 9.5% fixed: ${money(monthly)}`,
  ].join("\n");

  const slider =
    "mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#E3E3E9] accent-[#991212]";

  return (
    <>
      <section
        id="affordability"
        className="surface-light w-full scroll-mt-24 border-t border-[color:var(--rule)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          {/* Two columns: controls on the left, the answer on the right, both
              on one screen. In a single column the button sat a screen and a
              half below the sliders, so "I can afford that" and the thing to
              do about it never shared a viewport. */}
          <div className="lg:grid lg:grid-cols-[1fr_420px] lg:items-start lg:gap-16 xl:gap-20">
            {/* LEFT: what you are choosing */}
            <div>
              <p className="eyebrow">Before you talk to anyone</p>
              <h2 className="mt-5">What would it cost you a month?</h2>
              <p className="lede mt-5 max-w-lg">
                9.5% fixed for the whole term — it does not move when the
                Central Bank rate moves. Set the two figures and the answer
                appears beside them.
              </p>

              <div className="mt-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <label
                    htmlFor={`${uid}-amount`}
                    className="meta font-semibold uppercase tracking-[0.16em]"
                  >
                    How much you need
                  </label>
                  <output
                    htmlFor={`${uid}-amount`}
                    className="numeral text-[length:var(--type-card)] font-semibold text-[#212466]"
                  >
                    {money(loan)}
                  </output>
                </div>
                <input
                  id={`${uid}-amount`}
                  type="range"
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                  step={LOAN_STEP}
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                  className={slider}
                />
                <div className="mt-2 flex justify-between">
                  <span className="meta">{money(MIN_LOAN)}</span>
                  <span className="meta">{money(MAX_LOAN)}</span>
                </div>
              </div>

              <div className="mt-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <label
                    htmlFor={`${uid}-years`}
                    className="meta font-semibold uppercase tracking-[0.16em]"
                  >
                    How long to pay it back
                  </label>
                  <output
                    htmlFor={`${uid}-years`}
                    className="numeral text-[length:var(--type-card)] font-semibold text-[#212466]"
                  >
                    {term}
                  </output>
                </div>
                <input
                  id={`${uid}-years`}
                  type="range"
                  min={1}
                  max={MAX_YEARS}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className={slider}
                />
                <div className="mt-2 flex justify-between">
                  <span className="meta">1 year</span>
                  <span className="meta">25 years</span>
                </div>
              </div>

              <p className="meta mt-10 leading-relaxed lg:max-w-lg">
                Indicative only. Excludes arrangement fees, valuation, legal
                costs and insurance, and lending is at the sole discretion of
                the bank. Market average is the Central Bank of
                Kenya&rsquo;s published commercial bank lending rate, July
                2026. Every figure for every combination is in the{" "}
                <Link
                  href="/documents/amortizationtable.pdf"
                  className="link font-semibold"
                >
                  full amortization table
                </Link>
                .
              </p>
            </div>

            {/* RIGHT: the answer, and the one thing to do about it */}
            <div className="mt-12 lg:mt-0 lg:sticky lg:top-28">
              <div className="border border-[color:var(--rule)] p-7 sm:p-9">
                <p className="meta uppercase tracking-[0.16em]">
                  Your monthly repayment
                </p>
                <p
                  aria-live="polite"
                  className="numeral mt-3 text-[length:var(--type-section)] font-semibold leading-none text-[#212466]"
                >
                  {money(monthly)}
                </p>
                <p className="meta mt-3">
                  {money(loan)} over {term} at 9.5% fixed
                </p>

                <div className="mt-7 border-t border-[color:var(--rule)] pt-6">
                  <p className="body-text">
                    At the {MARKET_LABEL} market average the same loan costs
                  </p>
                  <p className="numeral mt-2 text-[length:var(--type-sub)] font-semibold leading-tight text-[color:var(--accent)]">
                    {money(extraInterestAtMarket)}
                  </p>
                  <p className="body-text">more in interest over {term}.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="btn-pill btn-pill-dark mt-8 w-full"
                >
                  Begin my application
                </button>
                {/* The reassurance goes directly under the button, where the
                    hesitation happens. */}
                <p className="meta mt-4">
                  Two minutes, and no documents yet. We come back with what
                  you qualify for.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {isFormOpen && (
        <LeadForm
          onClose={() => setIsFormOpen(false)}
          product="Jenga Kwako"
          prefillNotes={prefill}
        />
      )}
    </>
  );
};

export default MortgageCalculator;
