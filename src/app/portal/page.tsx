import React from "react";
import PortalHero from "@/components/PortalHero";
import Features from "@/components/Features/Features";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

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
