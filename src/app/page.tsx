import Hero from "@/components/Hero";

import Logos from "@/components/Logos";

import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import ProductsListing from "@/components/ProductListing";
import PortalBanner from "@/components/PortalBanner";

import AboutUsVideoSection from "@/components/AboutVideo";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <AboutUsVideoSection />
        <Logos />
      </Container>

      <ProductsListing />
      <Container>
        <PortalBanner />
        <CTA />
        <Section
          id="testimonials"
          title="Testimonials"
          description="What Our Clients Say."
        ></Section>
        <Testimonials />
      </Container>
    </>
  );
};

export default HomePage;
