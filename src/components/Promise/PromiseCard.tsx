"use client";
import React, { useRef } from "react";
import { OurPromiseItem } from "@/types";
import { FaBullseye, FaEye, FaGem } from "react-icons/fa";

interface Props {
  promise: OurPromiseItem;
}

const PromiseCard: React.FC<Props> = ({ promise }) => {
  const { title, description, values } = promise;
  const cardRef = useRef<HTMLDivElement>(null);

  const getIcon = (title: string) => {
    switch (title) {
      case "Our Mission":
        return <FaBullseye size={32} className="text-[#991212] mb-4" />;
      case "Our Vision":
        return <FaEye size={32} className="text-[#991212] mb-4" />;
      case "Core Values":
        return <FaGem size={32} className="text-[#991212] mb-4" />;
      default:
        return null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X relative to card
      const y = e.clientY - rect.top; // Mouse Y relative to card
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "0px");
      cardRef.current.style.setProperty("--mouse-y", "0px");
    }
  };

  return (
    <div
      className="promise-card promise-card-hover"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {getIcon(title)}
      <h3 className="promise-card-title text-xl font-bold mb-2 text-left text-[#212466]">
        {title}
      </h3>
      <p className="promise-card-description text-gray-700 text-left mb-4">
        {description}
      </p>
      {values && (
        <div>
          <ul className="list-disc list-inside text-gray-700 text-left">
            {values.map((value, index) => (
              <li key={index} className="promise-card-list-item">
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PromiseCard;
