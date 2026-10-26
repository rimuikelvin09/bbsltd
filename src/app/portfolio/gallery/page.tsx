import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Gallery from "@/components/Gallery";
import { getGalleryImages } from "@/data/gallery";
import { getCaseStudies } from "@/data/caseStudies";

/**
 * /portfolio/gallery
 *
 * Split out of the Our Work listing because the two pages answer different
 * questions. A case study is read by somebody weighing up whether we can
 * solve THEIR problem; the gallery is browsed by somebody who just wants to
 * see buildings. Sharing a page meant whichever one a visitor came for,
 * they had to scroll past the other.
 *
 * NOTE ON THE ROUTE. This static segment sits beside the dynamic
 * /portfolio/[slug]. Next resolves static before dynamic, so this page
 * always wins - but it also means a case study may never be slugged
 * "gallery" or it would be unreachable. See RESERVED_PORTFOLIO_SLUGS.
 */
export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of homes, apartments and commercial buildings delivered by Benchmark Building Solutions across Kenya.",
  alternates: { canonical: "/portfolio/gallery" },
  openGraph: {
    title: "Gallery | Benchmark Building Solutions",
    description: "Photographs of completed work across Kenya.",
    url: "/portfolio/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
  const images = getGalleryImages();
  const hasCaseStudies = getCaseStudies().length > 0;

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <Container style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}>
        <Breadcrumbs
          trail={[{ label: "Our Work", href: "/portfolio" }, { label: "Gallery" }]}
        />

        <div className="mt-7 flex flex-col gap-5 border-b border-[color:var(--rule)] pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <p className="eyebrow">Gallery</p>
            <h1 className="t-section mt-4 max-w-[18ch]">The work, by category</h1>
          </div>
          {/* The case-study link only appears once there IS one. A live page
              pointing at a holding page is a dead end, and this is the page
              carrying the whole section while they are held back. */}
          <p className="max-w-[44ch] text-[length:var(--type-lede)] leading-[1.6] text-[color:var(--text-soft)]">
            Photographs of finished and in-progress work across Kenya.{" "}
            {hasCaseStudies ? (
              <>
                If you would rather read how a particular project was put
                together,{" "}
                <Link
                  href="/portfolio"
                  className="font-semibold text-[color:var(--accent)] hover:underline"
                >
                  the case studies are here
                </Link>
                .
              </>
            ) : (
              <>
                Written case studies - the brief, the constraint and the
                result on each one - are on the way.
              </>
            )}
          </p>
        </div>

        <div className="mt-10">
          <Gallery images={images} />
        </div>
      </Container>
    </section>
  );
}
