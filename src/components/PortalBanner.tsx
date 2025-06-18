"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { portalBannerData } from "@/data/portalbanner";
import { FiEye, FiBriefcase, FiBook } from "react-icons/fi";

// Map icon names to components
const iconMap = {
  FiEye: FiEye,
  FiBriefcase: FiBriefcase,
  FiBook: FiBook,
};

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const childVariants: Variants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const PortalBanner: React.FC = () => {
  const { title, subheading, features, imageSrc } = portalBannerData;

  // Render fallback UI if imageSrc is missing
  if (!imageSrc) {
    return (
      <section id="portal-banner" className="py-24 bg-gray-50">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <p className="text-gray-500">Image not available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portal-banner" className="py-24 bg-gray-50">
      <motion.div
        className="max-w-screen-lg mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div className="lg:w-7/12 text-left">
          <motion.div className="flex flex-col gap-4" variants={childVariants}>
            <div>
              <p className="mt-4 max-w-lg md:max-w-xl text-sm text-[#991212] uppercase mx-auto md:mx-0">
                {subheading}
              </p>
              <div className="w-32 h-[2px] bg-[#991212] my-2"></div>
              <h2 className="text-4xl text-left font-semibold capitalize text-[#212466]">
                {title}
              </h2>
            </div>
            <ul className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent =
                  iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="text-[#991212] mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-foreground-accent">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/portal">
              <button
                type="button"
                className="bg-[#212466] text-white flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit shadow-md transition-all duration-300 ease-in-out hover:text-[#212466] hover:bg-[#fffffffd]"
              >
                Learn more
              </button>
            </Link>
          </motion.div>
        </div>
        <div className="lg:w-6/12 flex justify-end relative bg-white/10 backdrop-blur-md h-auto p-4 border-2 border-white">
          <div className="w-full max-w-[1088px] aspect-[6/6] lg:w-fit flex justify-center lg:justify-end order-first lg:order-none">
            <Image
              src={imageSrc}
              alt={title}
              width={1088} // Doubled from 544
              height={1444} // Doubled from 722
              quality={75}
              priority={true}
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PortalBanner;
