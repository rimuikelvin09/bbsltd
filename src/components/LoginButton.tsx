import React from "react";
import clsx from "clsx";

import { portalDetails } from "@/data/portaldetails";

const CtaButton = ({ dark }: { dark?: boolean }) => {
  return (
    <a href={portalDetails.buttonUrl} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className={clsx(
          "flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit shadow-md transition-all duration-300 ease-in-out",
          {
            "text-white bg-[#212466] hover:text-[#212466] hover:bg-[#fffffffd]":
              !dark,
            "text-[#212466] bg-[#fffffffd] hover:text-white hover:bg-[#212466]":
              dark,
          }
        )}
      >
        <div>
          <div className="-mt-1 font-sans text-sm font-semibold">
            Access the portal{" "}
          </div>
        </div>
      </button>
    </a>
  );
};

export default CtaButton;
