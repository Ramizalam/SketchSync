import React, { useMemo } from "react";
import { IconType } from "react-icons/lib";

interface Props {
  children?: string;
  onClick?: (event: any) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: IconType;
  iconBorder?: boolean;
  variant?: "primary" | "secondary" | "danger" | "warning";
}

const Button: React.FC<Props> = (props) => {
  const variant = props.variant || "primary";

  const normalButtonClass = useMemo(
    () => `game-btn game-btn-${variant} ${props.className || ""}`,
    [variant, props.className]
  );

  const iconButtonClass = useMemo(
    () => `game-btn-icon ${props.className || ""}`,
    [props.className]
  );

  return (
    <button
      type={props.type || 'button'}
      className={props.icon && !props.children ? iconButtonClass : normalButtonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <props.icon className="w-5 h-5" />}
      {props.children && <span>{props.children}</span>}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  iconBorder: true,
  variant: "primary",
};

export default React.memo(Button);
