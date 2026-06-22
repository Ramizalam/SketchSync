import React, { ReactNode } from "react";

interface Props {
  value: number;
  title: string;
  id: string;
  children: ReactNode;
  onChange: (e: any) => void;
  disabled?: boolean
}

const DropDown: React.FC<Props> = (props) => {
  return (
    <div className="lobby-setting">
      <label className="lobby-setting-label" htmlFor={props.id}>{props.title}</label>
      <select
        value={props.value}
        onChange={props.onChange}
        className="game-select"
        id={props.id}
        disabled={props.disabled}
      >
        {props.children}
      </select>
    </div>
  );
};

DropDown.defaultProps = {};

export default React.memo(DropDown);