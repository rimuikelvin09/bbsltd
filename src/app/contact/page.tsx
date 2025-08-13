import FAQ from "@/components/FAQ";
import Container from "@/components/Container";
import ContactHero from "@/components/ContactHero";
import MapSection from "@/components/Maps";
import { footerDetails } from "@/data/footer";

const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <Container className="py-16">
        <FAQ />

        <MapSection
          title="Office Location"
          description="Find us at our office in Kiambu, Kenya."
          address="Room F10, 1st Floor, Residential Wing, K-Unity Building - Kiambu Town"
          phone={footerDetails.telephones.join(" / ")}
          email="info@bbsltd.ke"
        />
      </Container>
    </>
  );
};

export default ContactPage;
