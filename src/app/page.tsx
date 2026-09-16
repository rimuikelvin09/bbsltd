import Hero from "@/components/Hero";
import ProductsListing from "@/components/ProductListing";
import ProcessSection from "@/components/ProcessSection";
import FinancingNudge from "@/components/FinancingNudge";
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
 * 1. Hero              — what this company does, in the first thirty words
 * 2. The process       — how it works, and why that is transparent
 * 3. The six routes    — full-height rows, with the guide riding along
 * 4. Financing        — a pointer to the calculator on Jenga Kwako
 * 5. Client Portal     — the tool that keeps the process visible
 * 6. Logos             — who has trusted them
 * 7. CTA               — the page's one conversion action
 * 8. Testimonials      — closes on client voices, per the Peak-End Rule
 *
 * The hero's button is navigation ("See How It Works"), not a second ask: a
 * first-time visitor is top of funnel. The conversion action appears once,
 * at 7.
 *
 * 4 follows 3 because "which of these is me" and "can I afford it" are the
 * two questions in that order. It points at the calculator rather than
 * carrying one: the tool is Jenga Kwako's argument and belongs on its page,
 * and a home page that tries to close on a mortgage has skipped a step.
 */
const HomePage = async () => {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProcessSection />
      <ProductsListing products={products} />
      <FinancingNudge />

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
