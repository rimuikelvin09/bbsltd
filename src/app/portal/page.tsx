import React from "react";
import PortalHero from "@/components/PortalHero";
import Features from "@/components/Features/Features";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client portal",
  description:
    "Track your build from anywhere: progress, records and your current cost position, updated as the work happens.",
  alternates: { canonical: "/portal" },

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "Client portal",
    description:
      "Track your build from anywhere: progress, records and your current cost position, updated as the work happens.",
    url: "/portal",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client portal",
    description:
      "Track your build from anywhere: progress, records and your current cost position, updated as the work happens.",
    images: ["/images/seoimage.jpg"],
  },
};


const PortalPage = () => {
  return (
    <>
      <PortalHero />
      <Container>
        <Section
          id="features"
          title="Features"
          description="Experience True Peace of mind"
        >
          <Features />
          <CTA />
        </Section>
      </Container>
    </>
  );
};

export default PortalPage;
