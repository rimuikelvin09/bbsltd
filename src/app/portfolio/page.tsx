import React from "react";
import PortfolioHero from "@/components/PortofolioHero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectsListing from "@/components/ProjectListing";
import Gallery from "@/components/Gallery";
import { getGalleryImages } from "@/data/gallery";
import { getProjects } from "@/lib/content";

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
