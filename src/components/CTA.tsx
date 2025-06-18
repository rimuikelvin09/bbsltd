import { ctaDetails } from "@/data/cta";

import CtaButton from "./CtaButton";

const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      className="mt-10 mb-0 lg:my-20 relative overflow-hidden h-[50vh] w-full"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 h-full w-full bg-cover bg-center opacity-30 bg-CTA-cover"></div>
        <div className="absolute inset-0 h-full w-full bg-[#99121293]  opacity-100">
          {" "}
          {/* Increased opacity of gradient */}
          <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#991212,transparent)] opacity-50"></div>{" "}
          {/* Increased opacity of radial gradient */}
        </div>
      </div>

      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20 px-5">
        <div className="h-full w-full">
          <div className="h-full flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
              {ctaDetails.heading}
            </h2>
            <div className="mt-4 flex flex-col sm:flex-row items-center sm:gap-4">
              <CtaButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
