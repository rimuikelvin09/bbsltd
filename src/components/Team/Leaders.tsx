import LeadershipSection from "./LeadershipSection";

import { leaders } from "@/data/leadership";

const Leaders: React.FC = () => {
  return (
    <div id="leaders" className="pt-24">
      <h2 className="sr-only">leaders</h2>
      {leaders.map((item, index) => {
        return (
          <LeadershipSection
            key={index}
            leadership={item}
            imageAtRight={index % 2 !== 0}
          />
        );
      })}
    </div>
  );
};

export default Leaders;
