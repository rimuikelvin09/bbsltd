import React from "react";
import AboutUsHero from "@/components/AboutUsHero";
import OurPromise from "@/components/Promise/OurPromise";
import OurApproach from "@/components/OurApproach";
import Leaders from "@/components/Team/Leaders";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Technicalteam from "@/components/Team/Technicalteam";
import { ourApproachData } from "@/data/ourapproach";

const AboutUsPage = () => {
  return (
    <>
      <AboutUsHero />
      <Container className="py-16">
        <OurPromise />
        <OurApproach approach={ourApproachData} />
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
