import React from "react";
import PromiseCard from "@/components/Promise/PromiseCard";
import { missionVisionValues } from "@/data/ourpromise";

const OurPromise: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {" "}
        {/* Replaced Container with Tailwind */}
        <div className="text-left lg:text-center  mb-8">
          <h2 className="text-4xl font-black text-[#212466] mb-4">
            Our Philosophy
          </h2>
          <p className="text-lg font-semibold text-gray-700 lg:mx-10 my-16">
            At Benchmark Building Solutions, we believe in building more than
            just structures; we build solutions, relationships, and futures. Our
            customer-first approach drives us to understand your unique needs
            and deliver versatile, high-quality construction. Rooted in
            integrity and ethical practices, we are committed to transforming
            lives by creating homes and communities that empower and endure.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {missionVisionValues.map((promise) => (
            <PromiseCard key={promise.title} promise={promise} />
          ))}
        </div>
      </div>{" "}
      {/* Closing div for max-w-7xl and padding */}
    </section>
  );
};

export default OurPromise;
