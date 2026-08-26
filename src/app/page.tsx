import Hero from "@/components/Hero";
import ProductsListing from "@/components/ProductListing";
import ProcessSection from "@/components/ProcessSection";
import Logos from "@/components/Logos";
import PortalBanner from "@/components/PortalBanner";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { getProducts } from "@/lib/content";

/**
 * HOME PAGE ORDER
 * 1. Banner            — what this company does, in the first thirty words
 * 2. The six routes    — which one is mine
 * 3. The process       — how it works, and why that is transparent
 * 4. Logos             — who has trusted them
 * 5. Client Portal     — the tool that keeps the process visible
 * 6. CTA               — the page's one conversion action
 * 7. Testimonials      — closes on client voices, per the Peak-End Rule
 *
 * The banner's button is navigation ("See How It Works"), not a second
 * ask: a first-time visitor is top of funnel. The conversion action
 * appears once, at 6.
 */
const HomePage = async () => {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductsListing products={products} />
      <ProcessSection />
      <Container>
        <Reveal>
          <PortalBanner />
        </Reveal>
        <Reveal>
          <Logos />
        </Reveal>
        <Reveal>
          <CTA />
        </Reveal>
        <Reveal>
          <Section
            id="testimonials"
            title="Testimonials"
            description="What Our Clients Say."
          ></Section>
        </Reveal>
      </Container>
      <Reveal>
        <Testimonials />
      </Reveal>
    </>
  );
};

export default HomePage;
