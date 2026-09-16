import React from "react";
import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";

/**
 * The calculator lives on the Jenga Kwako page, where it belongs: it is that
 * product's argument, and a tool that answers one product's question does not
 * want to be the home page's centrepiece.
 *
 * But money is the thing that stops most people, and a visitor who never
 * clicks into Jenga Kwako never learns there is an answer. This band is the
 * pointer - the anchor figure, one sentence, one link, and nothing else. It
 * sells the click, not the mortgage.
 */
const FinancingNudge: React.FC = () => {
  return (
    <section
      id="financing"
      className="surface-dark w-full border-t border-[color:var(--rule)] py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-muted">If money is the holdup</p>
              <h2 className="t-sub mt-4">
                9.5% fixed. Up to KES 10.5M. Twenty-five years to pay.
              </h2>
              <p className="body-text mt-4 max-w-xl">
                Jenga Kwako is the same build with the financing arranged. The
                calculator on that page gives you the monthly figure before you
                speak to anybody.
              </p>
            </div>
            <Link
              href="/products/jenga-kwako#affordability"
              className="btn-pill shrink-0"
            >
              Work Out My Monthly
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default FinancingNudge;
