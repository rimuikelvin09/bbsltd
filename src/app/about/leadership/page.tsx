import React from "react";
import type { Metadata } from "next";

import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import Leaders from "@/components/Team/Leaders";
import Technicalteam from "@/components/Team/Technicalteam";

/**
 * /about/leadership
 *
 * Directors, then Management. Renamed from "Governance", which is investor
 * language - a client looking for who runs the firm looks for Leadership.
 *
 * The title carries the page on its own; a line of explanatory copy under
 * a heading that already says the thing is just a delay before the faces.
 */
export const metadata: Metadata = {
  title: "The Team Behind the Vision",
  description:
    "The directors and management of Benchmark Building Solutions - who runs the firm and who leads the work on site.",
  alternates: { canonical: "/about/leadership" },

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "The Team Behind the Vision",
    description:
      "The directors and management of Benchmark Building Solutions - who runs the firm and who leads the work on site.",
    url: "/about/leadership",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Team Behind the Vision",
    description:
      "The directors and management of Benchmark Building Solutions - who runs the firm and who leads the work on site.",
    images: ["/images/seoimage.jpg"],
  },
};

export default function LeadershipPage() {
  return (
    <div className="surface-light w-full">
      <Container style={{ paddingTop: "calc(var(--header-h, 5rem) + 2rem)" }}>
        <Breadcrumbs
          trail={[{ label: "About Us", href: "/about" }, { label: "Leadership" }]}
        />
        <h1 className="mt-5 max-w-[20ch]">The Team Behind the Vision</h1>
      </Container>

      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <Section
          id="directors"
          title="Directors"
          description="Who runs the firm"
        >
          <Leaders />
        </Section>

        <Section
          id="management"
          title="Management"
          description="The team leads behind our operations"
        >
          <Technicalteam />
        </Section>
      </Container>
    </div>
  );
}
