import React, { useEffect, useRef, useState } from "react";

import { composeClass } from "components/utils";
import { ITextFieldProps } from "./types";
import { autoResize } from "./utils";

export interface SelectTextFieldProps
  extends Omit<
    ITextFieldProps,
    "multiline" | "onInput" | "value" | "placeholder" | "type"
  > {
  items: { key: string; value: string }[];
  selected: string;
  onSelect?: (s: string) => void;
}

export function SelectTextField({
  label = "",
  icon = "",
  onSelect = () => {},
  onIconClick = () => {},
  error = false,
  variant = "underlined",
  items,
  selected,
}: SelectTextFieldProps) {
  const hasText = !!(selected && items.find((i) => i.key == selected)?.value);
  const [isFocused, setIsFocused] = useState(false);

  const selectRef = useRef<HTMLSelectElement>(document.createElement("select"));

  useEffect(() => {
    onSelect(selectRef.current.value);
  }, [selectRef.current.value]);

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
      <select
        ref={selectRef}
        className="text-field__select"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {items.map((i) => (
          <option key={i.key} value={i.key}>
            {i.value}
          </option>
        ))}
      </select>
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
