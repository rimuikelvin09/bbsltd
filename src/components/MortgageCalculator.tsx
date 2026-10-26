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
const MARKET_RATE = 0.135;
const MARKET_LABEL = "13.5%";
/**
 * The previous constant was 14.39%, the CBK's general COMMERCIAL BANK
 * LENDING rate. That is the wrong series to hold a mortgage against - it
 * covers all lending, sits higher, and overstated the saving. These are
 * from the CBK Residential Mortgage Market Survey: the average residential
 * mortgage rate, and the spread across individual loans.
 */
const MARKET_PRIOR_LABEL = "15.2%";
const MARKET_RANGE_LABEL = "7.5% to 20.4%";

const MAX_LOAN = 10_500_000;
const MIN_LOAN = 1_000_000;
const MAX_YEARS = 25;

const money = (n: number) => `KES ${Math.round(n).toLocaleString("en-US")}`;

const monthlyPayment = (principal: number, rate: number, years: number) => {
  const r = rate / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
};

const AMOUNT_PRESETS = [2_000_000, 5_000_000, 7_500_000, MAX_LOAN];
const YEAR_PRESETS = [10, 15, 20, 25];

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

/**
 * Quick picks beside the field.
 *
 * A slider was here and a user took a while to work out it was draggable -
 * a slider gives no affordance until you already know the convention, and
 * on a phone it fights the page scroll. A typed field is unambiguous but
 * slow; the chips make the common answers one tap. Together they cover both
 * the person who knows their figure and the person who is only exploring.
 */
const Picks: React.FC<{
  values: number[];
  current: number;
  format: (v: number) => string;
  onPick: (v: number) => void;
  label: string;
}> = ({ values, current, format, onPick, label }) => (
  <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={label}>
    {values.map((v) => (
      <button
        key={v}
        type="button"
        onClick={() => onPick(v)}
        aria-pressed={current === v}
        className={`rounded-full border px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors ${
          current === v
            ? "border-[#212466] bg-[#212466] text-white"
            : "border-[color:var(--rule)] bg-white text-[color:var(--text-faint)] hover:border-[#991212] hover:text-[#991212]"
        }`}
      >
        {format(v)}
      </button>
    ))}
  </div>
);

const MortgageCalculator: React.FC = () => {
  const [loan, setLoan] = useState(5_000_000);
  const [years, setYears] = useState(25);
  // The field keeps its own text so someone typing "1" on the way to
  // "10500000" is not yanked to the minimum between keystrokes. Clamping
  // happens on blur, when they have finished saying what they mean.
  const [loanText, setLoanText] = useState((5_000_000).toLocaleString("en-US"));
  const [yearsText, setYearsText] = useState("25");
  // Midpoint of the 25-45k band our own Kiambu project found for two-beds.
  const [rent, setRent] = useState(35_000);
  const [rentText, setRentText] = useState((35_000).toLocaleString("en-US"));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const uid = useId();

  const onLoanChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    setLoanText(digits ? Number(digits).toLocaleString("en-US") : "");
    const n = Number(digits);
    if (digits && n >= MIN_LOAN && n <= MAX_LOAN) setLoan(n);
  };
  const commitLoan = () => {
    const digits = loanText.replace(/[^\d]/g, "");
    const n = clamp(Number(digits) || MIN_LOAN, MIN_LOAN, MAX_LOAN);
    setLoan(n);
    setLoanText(n.toLocaleString("en-US"));
  };

  const onYearsChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "").slice(0, 2);
    setYearsText(digits);
    const n = Number(digits);
    if (digits && n >= 1 && n <= MAX_YEARS) setYears(n);
  };
  const onRentChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "").slice(0, 7);
    setRentText(digits ? Number(digits).toLocaleString("en-US") : "");
    setRent(Number(digits) || 0);
  };

  const commitYears = () => {
    const n = clamp(Number(yearsText) || 1, 1, MAX_YEARS);
    setYears(n);
    setYearsText(String(n));
  };

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

  // Rent assumed FLAT for the whole term, which understates what renting
  // actually costs. Deliberately conservative: the comparison should be
  // one nobody can accuse us of loading.
  const rentTotal = rent * 12 * years;
  const gap = monthly - rent;
  // What one percentage point of movement does, on a loan where it can.
  const onePointMore = monthlyPayment(loan, ANNUAL_RATE + 0.01, years) - monthly;

  const prefill = [
    "Jenga Kwako application started from the calculator.",
    `Amount: ${money(loan)}`,
    `Term: ${term}`,
    `Indicative monthly repayment at 9.5% fixed: ${money(monthly)}`,
  ].join("\n");


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
                <label
                  htmlFor={`${uid}-amount`}
                  className="meta font-semibold uppercase tracking-[0.16em]"
                >
                  How much you need
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-[color:var(--rule)] bg-white px-4 py-3 focus-within:border-[#991212]">
                  <span className="meta font-bold text-[color:var(--text-muted)]">
                    KES
                  </span>
                  <input
                    id={`${uid}-amount`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={loanText}
                    onChange={(e) => onLoanChange(e.target.value)}
                    onBlur={commitLoan}
                    aria-describedby={`${uid}-amount-help`}
                    className="numeral w-full border-0 bg-transparent p-0 text-[length:var(--type-sub)] font-semibold text-[#212466] outline-none"
                  />
                </div>
                <Picks
                  values={AMOUNT_PRESETS}
                  current={loan}
                  format={(v) => `${v / 1_000_000}M`}
                  onPick={(v) => {
                    setLoan(v);
                    setLoanText(v.toLocaleString("en-US"));
                  }}
                  label="Common amounts"
                />
                <p id={`${uid}-amount-help`} className="meta mt-2">
                  {money(MIN_LOAN)} to {money(MAX_LOAN)}
                </p>
              </div>

              <div className="mt-9">
                <label
                  htmlFor={`${uid}-years`}
                  className="meta font-semibold uppercase tracking-[0.16em]"
                >
                  How long to pay it back
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-[color:var(--rule)] bg-white px-4 py-3 focus-within:border-[#991212]">
                  <input
                    id={`${uid}-years`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={yearsText}
                    onChange={(e) => onYearsChange(e.target.value)}
                    onBlur={commitYears}
                    aria-describedby={`${uid}-years-help`}
                    className="numeral w-16 border-0 bg-transparent p-0 text-[length:var(--type-sub)] font-semibold text-[#212466] outline-none"
                  />
                  <span className="meta font-bold text-[color:var(--text-muted)]">
                    {years === 1 ? "year" : "years"}
                  </span>
                </div>
                <Picks
                  values={YEAR_PRESETS}
                  current={years}
                  format={(v) => `${v} yrs`}
                  onPick={(v) => {
                    setYears(v);
                    setYearsText(String(v));
                  }}
                  label="Common terms"
                />
                <p id={`${uid}-years-help`} className="meta mt-2">
                  1 to {MAX_YEARS} years
                </p>
              </div>

              <p className="meta mt-10 leading-relaxed lg:max-w-lg">
                Indicative only. Excludes arrangement fees, valuation, legal
                costs and insurance, and lending is at the sole discretion of
                the bank. Market average is the average residential mortgage
                rate in the Central Bank of Kenya&rsquo;s Residential
                Mortgage Market Survey, 2025. Nothing here is financial
                advice. Every figure for every combination is in the{" "}
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

          {/*
            WHAT YOU GET FOR IT.

            A rate comparison only says "this is less bad". These three
            panels say what the money buys, and NONE of them needs a
            forecast - which matters, because the honest position is
            awkward. HassConsult has satellite-town prices up 3.10x since
            2007, but Kiambu DOWN 4.8% in the year to June 2026. A tool
            projecting smooth appreciation would be contradicted by one
            search, on the site whose whole argument is that we say the
            uncomfortable part. So: rent is a known cash flow, rate
            certainty is a published fact, and the appreciation figure is
            presented as history with its source and its recent decline
            stated beside it.
          */}
          <div className="mt-16 border-t border-[color:var(--rule)] pt-12 sm:mt-20">
            <p className="eyebrow">What you get for it</p>
            <h3 className="t-sub mt-4 max-w-[28ch]">
              The rate is the headline. The ownership is the point.
            </h3>

            <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="flex flex-col rounded-xl border border-[color:var(--rule)] bg-white p-6 lg:p-7">
                <p className="meta font-bold uppercase tracking-[0.16em]">
                  Against rent
                </p>
                <label htmlFor={`${uid}-rent`} className="meta mt-4 block">
                  What do you pay in rent now?
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-[color:var(--rule)] px-3 py-2 focus-within:border-[#991212]">
                  <span className="meta font-bold text-[color:var(--text-muted)]">
                    KES
                  </span>
                  <input
                    id={`${uid}-rent`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={rentText}
                    onChange={(e) => onRentChange(e.target.value)}
                    className="numeral w-full border-0 bg-transparent p-0 text-[length:var(--type-card)] font-semibold text-[#212466] outline-none"
                  />
                </div>
                <p className="body-text mt-4">
                  Over {term} that is{" "}
                  <strong className="numeral">{money(rentTotal)}</strong> paid
                  out, and none of it is yours at the end &mdash; and that
                  assumes your rent never goes up.
                </p>
                <p className="body-text mt-3">
                  {gap >= 0 ? (
                    <>
                      The repayment above is{" "}
                      <strong className="numeral">{money(gap)}</strong> a month
                      more than that, for a house you own.
                    </>
                  ) : (
                    <>
                      The repayment above is{" "}
                      <strong className="numeral">{money(-gap)}</strong> a
                      month <em>less</em> than that, for a house you own.
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-[color:var(--rule)] bg-white p-6 lg:p-7">
                <p className="meta font-bold uppercase tracking-[0.16em]">
                  A rate that cannot move
                </p>
                <p className="numeral mt-4 text-[length:var(--type-sub)] font-semibold leading-none text-[#212466]">
                  9.5%
                </p>
                <p className="meta mt-2">fixed, for the whole term</p>
                <p className="body-text mt-4">
                  A variable rate is a different promise. The Central
                  Bank&rsquo;s mortgage survey put the market average at{" "}
                  {MARKET_PRIOR_LABEL} in 2024 and {MARKET_LABEL} in 2025,
                  with individual loans ranging from {MARKET_RANGE_LABEL}.
                </p>
                <p className="body-text mt-3">
                  On a loan where the rate can move, one percentage point
                  changes this monthly by about{" "}
                  <strong className="numeral">{money(onePointMore)}</strong>.
                  Yours cannot move.
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-[color:var(--rule)] bg-white p-6 lg:p-7">
                <p className="meta font-bold uppercase tracking-[0.16em]">
                  What the asset has done
                </p>
                <p className="numeral mt-4 text-[length:var(--type-sub)] font-semibold leading-none text-[#212466]">
                  3.10&times;
                </p>
                <p className="meta mt-2">
                  satellite-town house prices since December 2007
                </p>
                <p className="body-text mt-4">
                  That is roughly 6.3% a year over eighteen years, and ahead
                  of the Nairobi suburbs over the same period.
                </p>
                <p className="body-text mt-3">
                  It is not a straight line. Kiambu prices fell 4.8% in the
                  year to June 2026. A rate fixed for {term} is how you sit
                  out a year like that rather than being forced to sell into
                  it.
                </p>
                <p className="meta mt-4">
                  HassConsult Property Price Index, Q2 2026. Past movement is
                  not a forecast.
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
