import { motion } from "framer-motion";

import { IFeatureBullet } from "@/types";
import { childVariants } from "./FeatureSection";

const FeatureBullet: React.FC<IFeatureBullet> = ({
  title,
  description,
  icon,
}: IFeatureBullet) => {
  return (
    <motion.div
      className="flex flex-row items-center mt-8 gap-3 lg:gap-5"
      variants={childVariants}
    >
      <div className="flex justify-center flex-shrink-0 w-fit">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-base text-foreground-accent">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureBullet;
