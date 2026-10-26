import Hero from "@/components/Hero";
import ProductsListing from "@/components/ProductListing";
import ProcessSection from "@/components/ProcessSection";
import FinancingNudge from "@/components/FinancingNudge";
import Logos from "@/components/Logos";
import PortalBanner from "@/components/PortalBanner";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import LearnBand from "@/components/LearnBand";
import Container from "@/components/Container";
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

      {/*
        CREDIBILITY BEFORE CHOICE.

        Logos and testimonials used to sit BELOW the product list, which
        meant a visitor was asked to choose a product before being given any
        reason to believe us - and anyone who clicked a product (the intended
        action) never saw either. Accreditations do their work before the
        decision; testimonials do theirs immediately after the money
        objection is answered, which is where doubt actually peaks.
      */}
      <Container className="pt-12 sm:pt-14">
        <Reveal>
          <Logos />
        </Reveal>
      </Container>

      <ProductsListing products={products} />
      <FinancingNudge />

      <Reveal>
        <Testimonials />
      </Reveal>

      {/* White between the coloured bands so the page breathes instead of
          stacking two heavy blocks against each other. */}
      <Container className="py-16 sm:py-20">
        <Reveal>
          <PortalBanner />
        </Reveal>
      </Container>

      <LearnBand />

      <Container>
        <Reveal>
          <CTA />
        </Reveal>
      </Container>
    </>
  );
};

export default HomePage;
