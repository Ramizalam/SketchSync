
import React from "react";

interface Props {
  className?: string
  children: string
  size?: string
}

const Header: React.FC<Props> = ({ children, className = "", size = "text-7xl" }) => {
  return <h1 className={`${size} max-w-min p-2 ${className} `}>{children}</h1>
}

export default React.memo(Header);
