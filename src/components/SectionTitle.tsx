import React from "react";

interface SectionTitleProps {
  children: React.ReactElement;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return React.cloneElement(children, {
    className:
      children.props.className +
      " text-3xl lg:text-5xl lg:leading-tight font-black text-[#212466]",
  });
};

export default SectionTitle;
