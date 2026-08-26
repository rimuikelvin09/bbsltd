import React from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  style,
  id,
}: React.PropsWithChildren<Props>) => {
  return (
    <div
      id={id}
      style={style}
      className={`px-5 w-full max-w-7xl mx-auto ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Container;
