import React from "react";
import PortfolioHero from "@/components/PortofolioHero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectsListing from "@/components/ProjectListing";
import Gallery from "@/components/Gallery";
import { getGalleryImages } from "@/data/gallery"; // ✅ Import dynamic function

const PortfolioListingPage = () => {
  const galleryImages = getGalleryImages(); // ✅ Auto-fetch images from folders

  return (
    <>
      <PortfolioHero />
      <ProjectsListing />
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
