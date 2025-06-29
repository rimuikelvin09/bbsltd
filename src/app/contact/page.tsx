import FAQ from "@/components/FAQ";
import Container from "@/components/Container";
import ContactHero from "@/components/ContactHero";
import MapSection from "@/components/Maps";

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
          phone="+254 722 333324"
          email="info@bbsltd.co.ke"
        />
      </Container>
    </>
  );
};

export default ContactPage;
