import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * /learn/financing
 *
 * A TOPIC HUB, not a category. See the long note at the top of
 * data/financing.ts for why. In short: every Learn category is a format, so
 * a "financing" category would be the only topic among them and nobody
 * would know where to file the next financing article. This page is a view
 * that gathers the financing material wherever it lives.
 *
 * THIS IS A STATIC SEGMENT and it sits beside /learn/[category]. Next
 * resolves the static segment first, so it wins, but a category slugged
 * "financing" would still be unreachable. RESERVED_LEARN_SEGMENTS exists to
 * stop that happening quietly.
 *
 * WHAT THIS PAGE IS FOR. The Jenga Kwako product page used to carry all of
 * this and it buried the decision under argument. The product page now
 * keeps the one sentence that moves a first-time buyer and sends everybody
 * who wants the working here. So this page can be as long as it needs to be.
 */

const TITLE = "Affordable construction financing";
const DESCRIPTION =
  "What a construction mortgage actually costs each month, what the bank asks for, and what you gain by borrowing instead of saving. Kenyan figures, no sales pitch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/learn/financing" },
  /**
   * Next merges metadata SHALLOWLY: a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Hence the repetition,
   * images included on purpose.
   */
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/learn/financing",
    type: "article",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/seoimage.jpg"],
  },
};

/** The three things this hub gathers. Each keeps its own home in Learn. */
const ITEMS = [
  {
    href: "/learn/guides/jenga-kwako-repayment-table",
    kicker: "Tool",
    title: "Find your repayment",
    body: "Every amount from KES 1M to 10.5M, across 1 to 25 years. Then open any year to see how much of it went to interest and how much came off the loan.",
  },
  {
    href: "/learn/guides/jenga-kwako-requirements-checklist",
    kicker: "Checklist",
    title: "What the bank asks for",
    body: "The documents, salaried and self-employed, plus the construction stack. Gather these before you apply and the file moves.",
  },
  {
    href: "/learn/guides/diaspora-payment-guide-usa",
    kicker: "Guide",
    title: "Moving the money from abroad",
    body: "How to send funds for a build from the United States, step by step, and what evidence to keep at each release.",
  },
];

export default function FinancingHubPage() {
  return (
    <div className="surface-light w-full">
      <Container style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}>
        <Breadcrumbs
          trail={[{ label: "Learn", href: "/learn" }, { label: "Financing" }]}
        />
        <p className="eyebrow mt-5">Start here</p>
        <h1 className="t-section mt-4 max-w-[20ch]">{TITLE}</h1>
        <p className="lede mt-6 max-w-[58ch]">
          Most people who want to build can afford a monthly repayment. What
          stops them is not knowing what the repayment would be, what the bank
          will ask for, or whether borrowing is better than saving up. This is
          all three, with the working shown.
        </p>
      </Container>

      {/* The three tools, up top, because some people came for exactly one. */}
      <Container className="pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-xl border border-[color:var(--rule)] bg-white p-6 transition-colors hover:border-[#991212]"
            >
              <p className="meta font-bold uppercase tracking-[0.16em] text-[#991212]">
                {item.kicker}
              </p>
              <h2 className="t-card mt-3 text-[color:var(--text)]">
                {item.title}
              </h2>
              <p className="body-text mt-3">{item.body}</p>
              <span className="meta mt-5 font-bold text-[#212466] group-hover:underline">
                Open it
              </span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[65ch]">
          <h2 className="t-sub">Renting, or building with a mortgage</h2>
          <p className="body-text mt-4">
            Rent is the smaller figure every month. Over twenty-five years it
            is not the smaller total. Here is the arithmetic on a full Jenga
            Kwako loan.
          </p>
          <p className="body-text mt-4">
            KES 10.5 million over 25 years at 9.5% fixed is about{" "}
            <strong className="numeral">KES 91,700</strong> a month. If you
            currently pay <strong className="numeral">KES 50,000</strong> in
            rent, the difference is about{" "}
            <strong className="numeral">KES 41,700</strong>. Save that
            difference instead of borrowing and, if your rent never changed,
            it would take <strong>about 21 years</strong> to reach 10.5
            million.
          </p>
          <p className="body-text mt-4">
            Rent does change. Hass Consult has satellite-town rents at{" "}
            <strong>3.16 times</strong> their December 2007 level, which is
            about 6.4% a year for eighteen years. Put that same rate against
            the saving route and it does not take 21 years. It never gets
            there at all.
          </p>

          <div className="mt-6 rounded-xl border border-[color:var(--rule)] bg-white p-6">
            <p className="meta font-bold uppercase tracking-[0.16em]">
              Why the saving route stalls
            </p>
            <p className="body-text mt-4">
              Starting at KES 50,000 and rising 6.4% a year, your rent passes
              the mortgage repayment{" "}
              <strong>just before year ten</strong>. Up to that point you have
              put aside roughly{" "}
              <strong className="numeral">KES 2.9 million</strong> of the 10.5
              you need. After it there is nothing left over to save, because
              the rent is now the larger bill. The mortgage repayment has not
              moved, because it cannot.
            </p>
            <p className="body-text mt-4">
              This assumes rents carry on rising as they have for the last
              eighteen years. If they rise more slowly, the saving route takes
              somewhere between 21 years and never. The repayment does not
              change either way.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-[color:var(--rule)] bg-white p-6">
            <p className="meta font-bold uppercase tracking-[0.16em]">
              What these figures assume
            </p>
            <ul className="mt-4 grid list-disc gap-2 pl-5 body-text">
              <li>Your savings earn no interest.</li>
              <li>The house costs the same to build later as it does now.</li>
              <li>No change in the value of the house is counted.</li>
            </ul>
            <p className="meta mt-4">
              Rent series: Hass Consult Property Price Index, satellite towns,
              Q2 2026. Repayment: 9.5% fixed on reducing balance.
            </p>
          </div>

          <h2 className="t-sub mt-14">The tax relief</h2>
          <p className="body-text mt-4">
            Interest on money borrowed to buy, improve or build a home you live
            in is deductible against your taxable income, up to{" "}
            <strong className="numeral">KES 360,000 a year</strong>, which is
            KES 30,000 a month of interest. That cap was raised from KES
            300,000 by the Tax Laws (Amendment) Act 2024.
          </p>
          <p className="body-text mt-4">
            The more recent change matters more for a construction mortgage. Until
            the Finance Act 2025, the deduction was written around buying or
            improving a house. That Act extended it to{" "}
            <strong>building one</strong>. If you are putting up a house rather
            than purchasing a finished one, the relief now reaches you.
          </p>
          <p className="body-text mt-4">
            It is a deduction from taxable income rather than a credit, so
            what it is worth depends on your own PAYE band. Confirm your
            position with KRA or your accountant.
          </p>
          <p className="meta mt-4">
            Income Tax Act section 15(3). Cap raised by the Tax Laws
            (Amendment) Act 2024, effective December 2024. Extended to
            construction by the Finance Act 2025.
          </p>

          <h2 className="t-sub mt-14">What a fixed rate protects you from</h2>
          <p className="body-text mt-4">
            9.5% is fixed for the whole term. It does not move when the Central
            Bank rate moves. A commercial mortgage sits around 13.5% today and
            is variable, and Kenyan mortgage rates have ranged between 7.5% and
            20.4%.
          </p>
          <p className="body-text mt-4">
            Beyond the lower rate, a fixed repayment makes your budget for the
            next twenty-five years a number you already know. A variable rate
            cannot. That uncertainty is what breaks most people who get into
            trouble with a mortgage.
          </p>
          <p className="meta mt-4">
            Central Bank of Kenya, average commercial bank lending rate, July
            2026, and the CBK Residential Mortgage Market Survey for the
            spread across individual loans. The matching constant lives in
            components/MortgageCalculator.tsx: change both together.
          </p>

          <h2 className="t-sub mt-14">Equity, and how slowly it builds</h2>
          <p className="body-text mt-4">
            Equity is the part of the house that is actually yours, and banks
            lend against it. A savings account is not collateral for anything.
          </p>
          <p className="body-text mt-4">
            The pace is slow at first. On a 10.5 million loan over 25 years,
            five years of payments take about{" "}
            <strong className="numeral">KES 660,000</strong> off the balance,
            because early payments are mostly interest. Most of what you hold
            in the early years comes from the house being worth more rather
            than from the loan being smaller. Satellite-town house prices
            multiplied 3.10 times in the eighteen years to 2026, and the line
            has not been straight: Kiambu prices fell 4.8% in the year to June
            2026.
          </p>
          <p className="body-text mt-4">
            A fixed rate is how you sit out a year like that instead of being
            forced to sell into it.
          </p>
          <p className="meta mt-4">
            HassConsult Property Price Index, Q2 2026.
          </p>
        </div>

        <div className="mt-14 border-t border-[color:var(--rule)] pt-10">
          <h2 className="t-sub max-w-[24ch]">
            Work out your own figure, then talk to us.
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/products/jenga-kwako#affordability" className="btn-pill">
              Open the calculator
            </Link>
            <Link href="/learn/guides/jenga-kwako-requirements-checklist" className="btn-pill-dark">
              See what the bank asks for
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
