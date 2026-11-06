"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ctaDetails } from "@/data/cta";
import CtaButton from "./CtaButton";
import dynamic from "next/dynamic";
// The enquiry modal and its country and county lists are ~500 lines that
// nobody loads unless they open the form. Keeping it out of the initial
// bundle costs nothing and is the single biggest win available here.
const LeadForm = dynamic(() => import("@/components/LeadForm"), {
  ssr: false,
});

/**
 * THE ENQUIRY BAND
 * ----------------
 * Rewritten Nov 2026. It used to be a 50vh block with a crimson wash over a
 * background image, rendered on the home page and the portal page only. It
 * is now the top of the footer and therefore appears on EVERY page, which is
 * why it no longer sits in those two page files. If you find yourself adding
 * `<CTA />` to a page, it is already there.
 *
 * THE SEAM. This band has to dissolve into the footer beneath it rather than
 * butting against it, which is the same problem the hero and the process
 * section already solved. The technique is deliberately identical: both
 * sides fade into `rgba(var(--band-rgb), 1)`, so there is no edge to see and
 * it survives the light and dark band inversion without a second rule. The
 * footer carries the matching fade at its top. If you change one, change the
 * other.
 *
 * WHY LEFT-ALIGNED. The old version centred everything, which is what made
 * it read as a banner advert rather than part of the page. Left-aligned
 * puts the heading on the same optical axis as every other section on the
 * site, and leaves the right of the photograph visible.
 */
const CTA: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  return (
    <section
      id="cta"
      className="surface-dark relative isolate w-full overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Darkens left to right so the type stays legible while the room
            behind it survives on the right. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(var(--band-rgb), 0.95) 0%, rgba(var(--band-rgb), 0.86) 44%, rgba(var(--band-rgb), 0.52) 100%)",
          }}
        />

        {/* The seam. Matches ProcessSection's top fade, inverted. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(var(--band-rgb), 0) 0%, rgba(var(--band-rgb), 0.75) 55%, rgba(var(--band-rgb), 1) 100%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <p className="eyebrow eyebrow-muted display-shadow">Start here</p>
        <h2 className="display-shadow mt-4 max-w-[16ch] text-[color:var(--text)]">
          {ctaDetails.heading}
        </h2>
        <p className="lede display-shadow mt-5 max-w-[46ch] text-[color:var(--text-soft)]">
          Tell us where the plot is and what you want on it. We come back with
          what it takes to build, and what it costs.
        </p>
        <div className="mt-8">
          {/* Not the CtaButton default. "Start Your Legacy" is the brochure
              line the rest of the site has already dropped. */}
          <CtaButton onClick={toggleForm} label="Talk to us" />
        </div>
      </div>

      {isFormOpen && <LeadForm onClose={toggleForm} product="General enquiry" />}
    </section>
  );
};

export default CTA;
