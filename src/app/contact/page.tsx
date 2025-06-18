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
          address="K-unity Building (Mapa House), Kiambu town, 1st Floor, Room 1"
          phone="+254 722 333324"
          email="info@bbsltd.co.ke"
        />
      </Container>
    </>
  );
};

export default ContactPage;
