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
