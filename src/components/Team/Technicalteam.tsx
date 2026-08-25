import React from "react";
import Image from "next/image";
import { technicalTeam } from "@/data/technicalTeam"; // Adjust the import path as needed

const TechnicalTeam: React.FC = () => {
  return (
    <section id="technical-team" className="py-12 bg-gray-50">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {technicalTeam.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-md overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{member.title}</p>
                <p className="text-gray-500 text-xs">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalTeam;
