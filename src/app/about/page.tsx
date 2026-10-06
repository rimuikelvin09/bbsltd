import React from "react";
import AboutUsHero from "@/components/AboutUsHero";
import OurApproach from "@/components/OurApproach";
import Leaders from "@/components/Team/Leaders";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Technicalteam from "@/components/Team/Technicalteam";
import { ourApproachData } from "@/data/ourapproach";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who we are: a Kenyan building contractor since 2012, with architectural, structural and MEP work in house, and the values the team is held to.",
  alternates: { canonical: "/about" },
};


const AboutUsPage = () => {
  return (
    <>
      <AboutUsHero />
      <Container className="py-16">
        <Reveal>
          <OurApproach approach={ourApproachData} />
        </Reveal>
        <Section
          id="leadership"
          title="Leadership"
          description="The Team Behind the Vision"
        >
          <Leaders />
          <Section
            id="technicalteam"
            title="Technical Team"
            description="The Team Leads Behind Our Operations"
          ></Section>
          <Technicalteam />
        </Section>
      </Container>
    </>
  );
};

export default AboutUsPage;
