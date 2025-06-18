"use client";

import React, { useEffect, useState } from "react";
import { dailyTips } from "@/data/tips";
import { DailyTip as Tip } from "@/types"; // Alias the type to avoid naming conflict

const DailyTipCard: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = (date: Date) =>
      Math.floor(
        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
          1000 /
          60 /
          60 /
          24
      );
    const tipIndex = dayOfYear(today) % dailyTips.length;
    setCurrentTip(dailyTips[tipIndex]);
  }, []);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-KE", options); // Using Kenyan locale
  };

  return (
    <div className="max-w-lg w-full mx-auto py-8 px-6 bg-white rounded-lg shadow-md">
      {currentTip ? (
        <>
          <h2 className="text-xl font-semibold text-secondary mb-2">
            {currentTip.heading}
          </h2>
          <p className="text-foreground-accent text-lg mb-4">
            {currentTip.tip}
          </p>
          <p className="text-sm text-gray-500">
            Today&apos;s Tip - {formatDate(new Date())}
          </p>
        </>
      ) : (
        <p>Loading today&apos;s tip...</p>
      )}
    </div>
  );
};

const DailyTipSection: React.FC = () => {
  return (
    <section
      id="daily-tips"
      className="py-12 relative bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>{" "}
      {/* Reduced background visibility */}
      <div className="relative z-10 max-w-screen-md w-full mx-auto px-6">
        <DailyTipCard />
      </div>
    </section>
  );
};

export default DailyTipSection;
