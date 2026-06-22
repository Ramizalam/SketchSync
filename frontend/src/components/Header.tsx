
import React from "react";

interface Props {
  className?: string
  children: string
  size?: string
}

const Header: React.FC<Props> = ({ children, className = "", size }) => {
  const sizeClass = size ? size : "";
  return (
    <h1 className={`skribbl-logo ${sizeClass} ${className}`}>
      {children}
    </h1>
  );
}

export default React.memo(Header);
