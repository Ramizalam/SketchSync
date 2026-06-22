import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  value: string
  className?: string
  placeholder?: string
}

const Input: React.FC<Props> = ({ onChange, onKeyDown, value, className, placeholder }) => {
  return <input
    onChange={onChange}
    onKeyDown={onKeyDown}
    value={value}
    placeholder={placeholder}
    className={`game-input ${className || ""}`}
  />
}

Input.defaultProps = {};

export default React.memo(Input);