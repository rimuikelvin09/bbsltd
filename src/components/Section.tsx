import SectionTitle from "./SectionTitle";

interface Props {
  id: string;
  title: string;
  description: string;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  title,
  description,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <section id={id} className="py-10 text-left sm:text-center">
      <p className="eyebrow mt-4">{title}</p>
      <div className="eyebrow-rule mx-0 sm:mx-auto"></div>
      <SectionTitle>
        <h2 className="text-left sm:text-center">{description}</h2>
      </SectionTitle>

      {children}
    </section>
  );
};

export default Section;
