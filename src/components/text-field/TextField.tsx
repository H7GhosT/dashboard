import React, { useRef, useState } from "react";

import { composeClass } from "components/utils";
import { ITextFieldProps } from "./types";

export function TextField({
  label = "",
  value = "",
  icon = <></>,
  type = "text",
  placeholder = "",
  onInput = () => {},
  onIconClick = () => {},
  error = false,
}: ITextFieldProps) {
  const inpRef = useRef<HTMLInputElement>(document.createElement("input"));

  const hasText = !!value || !!placeholder;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={composeClass("text-field", { active: isFocused, error })}>
      <span
        className={composeClass("text-field__label", {
          "has-text": hasText || isFocused,
          active: isFocused,
          error,
        })}
      >
        {label}
      </span>
      <input
        ref={inpRef}
        className="text-field__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={() => onInput(inpRef.current.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span
        className={composeClass("text-field__icon", {
          active: isFocused,
          error,
        })}
        onClick={onIconClick}
      >
        {icon}
      </span>
    </div>
  );
}
