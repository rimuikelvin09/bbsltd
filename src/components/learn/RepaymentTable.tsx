"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";

/**
 * THE REPAYMENT TABLE, as a page rather than a PDF.
 *
 * It replaces /documents/amortizationtable.pdf as the thing people USE. The
 * PDF stays on the page as the download, unchanged, because that is the
 * cheapest possible answer to "I want to take this to the bank": a static
 * file that already exists, costs nothing to serve and adds no JavaScript.
 * We deliberately do NOT generate a PDF in the browser. The library needed
 * is around 300KB, which is more than this entire page, on a site where the
 * biggest outstanding fault is weight.
 *
 * TWO TABS, because there are two different questions:
 *   "Every amount"  the lookup the PDF already answers: what is the monthly.
 *   "Where it goes" the one it cannot: how much of each year is interest.
 * The second is the reason this is worth building. Distrust of mortgages in
 * this market is mostly distrust of what happens to the money, and a table
 * that shows the split answers it better than any paragraph.
 *
 * NO TAX COLUMN. An earlier draft had one, driven by a PAYE band selector.
 * It is out on purpose: see the note at the top of data/financing.ts.
 */

const ANNUAL_RATE = 0.095;
const MIN_LOAN = 500_000;
const MAX_LOAN = 10_500_000;
const TERMS = [10, 15, 20, 25];

const money = (n: number) => `KES ${Math.round(n).toLocaleString("en-US")}`;
const plain = (n: number) => Math.round(n).toLocaleString("en-US");

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12;
  const n = years * 12;
  if (principal <= 0 || n <= 0) return 0;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

interface YearRow {
  year: number;
  paid: number;
  interest: number;
  principal: number;
  closing: number;
  months: {
    month: number;
    paid: number;
    interest: number;
    principal: number;
    closing: number;
  }[];
}

/** Full amortisation, rolled up by year with the months kept underneath. */
function schedule(principal: number, annualRate: number, years: number): YearRow[] {
  const r = annualRate / 12;
  const n = years * 12;
  const m = monthlyPayment(principal, annualRate, years);
  let balance = principal;
  const out: YearRow[] = [];
  let k = 0;

  for (let y = 1; y <= years; y += 1) {
    const row: YearRow = {
      year: y,
      paid: 0,
      interest: 0,
      principal: 0,
      closing: 0,
      months: [],
    };
    for (let i = 0; i < 12 && k < n; i += 1, k += 1) {
      const interest = balance * r;
      const off = m - interest;
      balance = Math.max(0, balance - off);
      row.paid += m;
      row.interest += interest;
      row.principal += off;
      row.months.push({
        month: i + 1,
        paid: m,
        interest,
        principal: off,
        closing: balance,
      });
    }
    row.closing = balance;
    out.push(row);
  }
  return out;
}

const AMOUNTS: number[] = [];
for (let a = 1_000_000; a <= MAX_LOAN; a += 500_000) AMOUNTS.push(a);

const RepaymentTable: React.FC = () => {
  const uid = React.useId();
  const [loan, setLoan] = useState(7_500_000);
  const [loanText, setLoanText] = useState((7_500_000).toLocaleString("en-US"));
  const [years, setYears] = useState(20);
  const [yearsText, setYearsText] = useState("20");
  const [tab, setTab] = useState<"matrix" | "schedule">("matrix");
  const [open, setOpen] = useState<number | null>(null);

  const onLoanChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    setLoanText(digits ? Number(digits).toLocaleString("en-US") : "");
    const n = Number(digits);
    if (digits && n >= MIN_LOAN && n <= MAX_LOAN) setLoan(n);
  };
  const commitLoan = () => {
    const n = clamp(Number(loanText.replace(/[^\d]/g, "")) || MIN_LOAN, MIN_LOAN, MAX_LOAN);
    setLoan(n);
    setLoanText(n.toLocaleString("en-US"));
  };

  const onYearsChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    setYearsText(digits);
    const n = Number(digits);
    if (digits && n >= 1 && n <= 25) setYears(n);
  };
  const commitYears = () => {
    const n = clamp(Number(yearsText.replace(/[^\d]/g, "")) || 1, 1, 25);
    setYears(n);
    setYearsText(String(n));
  };

  const monthly = useMemo(
    () => monthlyPayment(loan, ANNUAL_RATE, years),
    [loan, years],
  );
  const rows = useMemo(
    () => schedule(loan, ANNUAL_RATE, years),
    [loan, years],
  );
  const totalPaid = monthly * years * 12;

  /** The row the reader's own amount is closest to, highlighted in the matrix. */
  const nearest = useMemo(
    () =>
      AMOUNTS.reduce(
        (best, a) => (Math.abs(a - loan) < Math.abs(best - loan) ? a : best),
        AMOUNTS[0],
      ),
    [loan],
  );

  const cell =
    "whitespace-nowrap px-3 py-2 text-right text-[length:var(--type-meta)] numeral";
  const head =
    "whitespace-nowrap px-3 py-2 text-right text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[color:var(--text-muted)]";

  return (
    <div className="mt-8">
      {/* The two figures, and the answer. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-loan`} className="meta block font-bold uppercase tracking-[0.14em]">
            How much you need
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-[color:var(--rule)] px-3 py-2 focus-within:border-[#991212]">
            <span className="meta font-bold text-[color:var(--text-muted)]">KES</span>
            <input
              id={`${uid}-loan`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={loanText}
              onChange={(e) => onLoanChange(e.target.value)}
              onBlur={commitLoan}
              className="numeral w-full min-w-0 border-0 bg-transparent p-0 text-[length:var(--type-card)] font-semibold text-[#212466] outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-years`} className="meta block font-bold uppercase tracking-[0.14em]">
            How long to pay it back
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-[color:var(--rule)] px-3 py-2 focus-within:border-[#991212]">
            <input
              id={`${uid}-years`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={yearsText}
              onChange={(e) => onYearsChange(e.target.value)}
              onBlur={commitYears}
              className="numeral w-full min-w-0 border-0 bg-transparent p-0 text-[length:var(--type-card)] font-semibold text-[#212466] outline-none"
            />
            <span className="meta font-bold text-[color:var(--text-muted)]">YEARS</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[color:var(--rule)] bg-white p-6">
        <p className="meta font-bold uppercase tracking-[0.16em]">
          Monthly repayment at 9.5% fixed
        </p>
        <p className="numeral mt-2 text-[length:var(--type-section)] font-semibold leading-none text-[#212466]">
          {money(monthly)}
        </p>
        <p className="body-text mt-3">
          Over {years} {years === 1 ? "year" : "years"} that comes to{" "}
          <strong className="numeral">{money(totalPaid)}</strong> in total, of
          which <strong className="numeral">{money(totalPaid - loan)}</strong> is
          interest.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {([
          ["matrix", "Every amount and term"],
          ["schedule", "Where your money goes"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
            className={clsx(
              "rounded-full border px-4 py-2 text-[length:var(--type-meta)] font-semibold transition-colors",
              tab === id
                ? "border-[#212466] bg-[#212466] text-white"
                : "border-[color:var(--rule)] text-[color:var(--text)] hover:border-[#991212] hover:text-[#991212]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "matrix" && (
        <>
          <div className="mt-5 max-h-[460px] overflow-auto rounded-xl border border-[color:var(--rule)]">
            <table className="w-full min-w-[520px] border-collapse bg-white">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-[color:var(--rule)]">
                  <th scope="col" className={clsx(head, "text-left")}>Loan</th>
                  {TERMS.map((t) => (
                    <th scope="col" key={t} className={head}>{t} years</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AMOUNTS.map((a) => (
                  <tr
                    key={a}
                    className={clsx(
                      "border-b border-[color:var(--rule)] last:border-b-0",
                      a === nearest && "bg-[#F2F4FF] font-bold",
                    )}
                  >
                    <th scope="row" className={clsx(cell, "text-left font-semibold")}>
                      {money(a)}
                    </th>
                    {TERMS.map((t) => (
                      <td key={t} className={cell}>
                        {plain(monthlyPayment(a, ANNUAL_RATE, t))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="meta mt-3">
            Any term from 1 to 25 years is available. The highlighted row is
            closest to your amount, and the figure above is exact for whatever
            you typed.
          </p>
        </>
      )}

      {tab === "schedule" && (
        <>
          <div className="mt-5 max-h-[460px] overflow-auto rounded-xl border border-[color:var(--rule)]">
            <table className="w-full min-w-[600px] border-collapse bg-white">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-[color:var(--rule)]">
                  <th scope="col" className={clsx(head, "text-left")}>Year</th>
                  <th scope="col" className={head}>Paid</th>
                  <th scope="col" className={head}>Interest</th>
                  <th scope="col" className={head}>Off the loan</th>
                  <th scope="col" className={head}>Still owing</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <React.Fragment key={row.year}>
                    <tr className="border-b border-[color:var(--rule)]">
                      <th scope="row" className={clsx(cell, "text-left")}>
                        <button
                          type="button"
                          onClick={() => setOpen(open === row.year ? null : row.year)}
                          aria-expanded={open === row.year}
                          className="font-semibold text-[#212466] underline-offset-4 hover:underline"
                        >
                          Year {row.year}
                        </button>
                      </th>
                      <td className={cell}>{plain(row.paid)}</td>
                      <td className={cell}>{plain(row.interest)}</td>
                      <td className={cell}>{plain(row.principal)}</td>
                      <td className={cell}>{plain(row.closing)}</td>
                    </tr>
                    {open === row.year &&
                      row.months.map((m) => (
                        <tr
                          key={m.month}
                          className="border-b border-[color:var(--rule)] bg-[#F7F7FA]"
                        >
                          <td className={clsx(cell, "text-left text-[color:var(--text-muted)]")}>
                            Month {m.month}
                          </td>
                          <td className={clsx(cell, "text-[color:var(--text-muted)]")}>{plain(m.paid)}</td>
                          <td className={clsx(cell, "text-[color:var(--text-muted)]")}>{plain(m.interest)}</td>
                          <td className={clsx(cell, "text-[color:var(--text-muted)]")}>{plain(m.principal)}</td>
                          <td className={clsx(cell, "text-[color:var(--text-muted)]")}>{plain(m.closing)}</td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="meta mt-3">
            Click any year to open its twelve months. Early payments are
            mostly interest and late ones are mostly loan, which is how every
            reducing-balance mortgage works.
          </p>
        </>
      )}
    </div>
  );
};

export default RepaymentTable;
