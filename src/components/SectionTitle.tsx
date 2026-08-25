import React from "react";

interface SectionTitleProps {
  children: React.ReactElement;
}

/**
 * Applies the standard section-heading level. The size, family and rhythm
 * come from the --type-section token in globals.css, so changing the scale
 * is an edit there rather than here.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return React.cloneElement(children, {
    className: [children.props.className, "t-section text-[color:var(--navy)]"]
      .filter(Boolean)
      .join(" "),
  });
};

export default SectionTitle;
