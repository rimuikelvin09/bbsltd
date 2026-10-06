import React from "react";
import PortfolioHero from "@/components/PortofolioHero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectsListing from "@/components/ProjectListing";
import Gallery from "@/components/Gallery";
import { getGalleryImages } from "@/data/gallery";
import { getProjects } from "@/lib/content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Homes, commercial buildings and refurbishments delivered across Kenya by Benchmark Building Solutions.",
  alternates: { canonical: "/portfolio" },
};


const PortfolioListingPage = async () => {
  const galleryImages = getGalleryImages();
  const projects = await getProjects();

  return (
    <>
      <PortfolioHero />
      <ProjectsListing projects={projects} />
      <Container>
        <Section
          id="gallery"
          title="Our Gallery"
          description="Check out our gallery"
        />
        <Gallery images={galleryImages} /> {/* ✅ Now dynamically populated */}
      </Container>
    </>
  );
};

export default PortfolioListingPage;
