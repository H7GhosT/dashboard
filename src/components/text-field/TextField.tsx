import React, { useRef, useState } from "react";

import { composeClass } from "components/utils";
import { ITextFieldProps } from "./types";
import { autoResize } from "./utils";

export function TextField({
  label = "",
  value = "",
  icon = "",
  type = "text",
  placeholder = "",
  onInput = () => {},
  onIconClick = () => {},
  error = false,
  variant = "underlined",
  multiline = false,
}: ITextFieldProps) {
  const inpRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const hasText = !!value || !!placeholder;
  const [isFocused, setIsFocused] = useState(false);

  const inputProps = {
    ref: inpRef,
    className: "text-field__input",
    type: type,
    value: value,
    placeholder: placeholder,
    onInput: () => onInput(inpRef.current?.value || ""),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  if (multiline) autoResize(inpRef);

  return (
    <div
      className={composeClass("text-field", {
        active: isFocused,
        error,
        "has-text": hasText || isFocused,
        [variant]: true,
      })}
    >
      <span className="text-field__label">{label}</span>
      {multiline ? (
        <textarea {...inputProps}></textarea>
      ) : (
        <input {...inputProps} />
      )}
      {icon ? (
        <span className="text-field__icon" onClick={onIconClick}>
          {icon}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
