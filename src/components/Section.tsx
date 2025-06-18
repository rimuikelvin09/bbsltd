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
    <section id={id} className="py-10 text-left sm:text-center  ">
      <p className="mt-4 text-sm uppercase text-[#191b4d]">{title}</p>
      <div className="w-32 h-[2px] bg-[#991212] my-2 sm:mx-auto mx-0"></div>
      <SectionTitle>
        <h2 className="text-4xl font-black text-[#212466] text-left sm:text-center">
          {description}
        </h2>
      </SectionTitle>

      {children}
    </section>
  );
};

export default Section;
