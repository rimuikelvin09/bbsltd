import FAQ from "@/components/FAQ";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ContactHero from "@/components/ContactHero";
import MapSection from "@/components/Maps";
import { footerDetails } from "@/data/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to Benchmark Building Solutions about your project. Room F10, K-Unity Building, Kiambu Town. Call +254 722 333324 or send an enquiry.",
  alternates: { canonical: "/contact" },

  /**
   * Next merges metadata SHALLOWLY - a page that defines `openGraph` replaces
   * the layout's entirely rather than extending it. Without this block the
   * page inherited the root object, so sharing any inner page showed the HOME
   * page's title and description. Hence the repetition: images included on
   * purpose, because they would otherwise be dropped.
   */
  openGraph: {
    title: "Contact us",
    description:
      "Talk to Benchmark Building Solutions about your project. Room F10, K-Unity Building, Kiambu Town.",
    url: "/contact",
    type: "website",
    images: ["/images/seoimage.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact us",
    description:
      "Talk to Benchmark Building Solutions about your project. Room F10, K-Unity Building, Kiambu Town.",
    images: ["/images/seoimage.jpg"],
  },
};


const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <Container className="py-16">
        <Reveal>
          <FAQ />
        </Reveal>

        <Reveal>
          <MapSection
          title="Office Location"
          description="Find us at our office in Kiambu, Kenya."
          address="Room F10, 1st Floor, Residential Wing, K-Unity Building - Kiambu Town"
          phone={footerDetails.telephones.join(" / ")}
            email="info@bbsltd.ke"
          />
        </Reveal>
      </Container>
    </>
  );
};

export default ContactPage;
