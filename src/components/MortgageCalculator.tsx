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
 * The prior-rate and range labels that used to live here (15.2%, and a
 * spread of 7.5% to 20.4%) moved to /learn/financing in Nov 2026 along with
 * the rate panel that printed them. They come from the CBK Residential
 * Mortgage Market Survey. If you change MARKET_RATE above, change the prose
 * on that page in the same commit: the two are now in different files and
 * nothing will tell you when they drift apart.
 */

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
  const gap = monthly - rent;
  // The one figure this section now exists to produce: how long the same
  // house takes to reach by saving the difference instead of borrowing it.
  const yearsToSave = gap > 0 ? Math.round(loan / gap / 12) : 0;

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
                9.5% fixed for the whole term. It doesn’t move when the
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
                  Start my application
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
          {/* WHAT MOVED, AND WHY. Nov 2026.

              This carried three panels: a rent comparison, a rate-certainty
              panel and a HassConsult appreciation figure. All three are now
              at /learn/financing. They were not wrong and they were not
              weakened; they were simply too much to read at the moment
              somebody is deciding, and the audience on this page is a
              first-time owner.

              WHAT STAYS IS ONE SENTENCE, built from the reader's own rent.
              Click-through from a product page into a Learn article runs in
              low single figures, so a reader who never clicks still has to
              meet the argument once. This is that once. Do not grow it back:
              anything that needs a second paragraph belongs in the hub. */}
          <div className="mt-16 border-t border-[color:var(--rule)] pt-12 sm:mt-20">
            <p className="eyebrow">What you get for it</p>

            <div className="mt-6 grid grid-cols-1 gap-9 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-14">
              <div className="min-w-0">
                <h3 className="t-sub max-w-[24ch]">
                  {gap > 0 ? (
                    <>
                      You move in now. Saving for the same house takes{" "}
                      <span className="numeral">{yearsToSave}</span>{" "}
                      {yearsToSave === 1 ? "year" : "years"}.
                    </>
                  ) : (
                    "Your rent is already higher than the repayment."
                  )}
                </h3>

                <p className="body-text mt-4 max-w-[54ch]">
                  {gap > 0 ? (
                    <>
                      Both cost you about the same each month. Save the{" "}
                      <strong className="numeral">{money(gap)}</strong>{" "}
                      difference instead of borrowing it and you reach{" "}
                      {money(loan)} in {yearsToSave} years, paying rent the
                      whole way. That assumes your rent never rises. If it
                      does, the saving takes longer.
                    </>
                  ) : (
                    <>
                      You would pay{" "}
                      <strong className="numeral">{money(-gap)}</strong> a
                      month less owning this house than you currently pay to
                      live in somebody else&rsquo;s.
                    </>
                  )}
                </p>

                <ul className="mt-7 grid gap-3">
                  {[
                    "The rate is fixed for the whole term, so the figure above is your budget for twenty-five years.",
                    "Interest on a home you build is deductible against your taxable income, up to KES 360,000 a year.",
                    "You own the house from day one, and the equity in it is something a bank will lend against later.",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-[#991212]"
                      />
                      <span className="body-text">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                  <Link
                    href="/learn/financing"
                    className="meta font-bold text-[#212466] underline underline-offset-4"
                  >
                    See the working on all of this
                  </Link>
                  <Link
                    href="/learn/guides/jenga-kwako-repayment-table"
                    className="meta font-bold text-[#212466] underline underline-offset-4"
                  >
                    The full repayment table
                  </Link>
                  <Link
                    href="/learn/guides/jenga-kwako-requirements-checklist"
                    className="meta font-bold text-[#212466] underline underline-offset-4"
                  >
                    What the bank asks for
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--rule)] bg-white p-6">
                <label
                  htmlFor={`${uid}-rent`}
                  className="meta block font-bold uppercase tracking-[0.16em]"
                >
                  What do you pay in rent now?
                </label>
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-[color:var(--rule)] px-3 py-2 focus-within:border-[#991212]">
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
                    className="numeral w-full min-w-0 border-0 bg-transparent p-0 text-[length:var(--type-card)] font-semibold text-[#212466] outline-none"
                  />
                </div>
                <p className="meta mt-3">
                  The sentence beside this is built from your rent.
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
