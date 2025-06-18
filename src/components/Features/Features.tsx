import FeatureSection from "./FeatureSection";

import { features } from "@/data/features";

const Features: React.FC = () => {
  return (
    <div id="features" className="py-8 mt-10">
      <h2 className="sr-only">Features</h2>
      {features.map((item, index) => {
        return (
          <FeatureSection
            key={index}
            feature={item}
            imageAtRight={index % 2 !== 0}
          />
        );
      })}
    </div>
  );
};

export default Features;
