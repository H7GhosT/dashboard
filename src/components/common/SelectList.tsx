import React from "react";
import { ReactNode } from "react";
import { composeClass } from "../utils";
import { ComponentTheme } from "./types";

export interface SelectListItem {
  key: string;
  value: ReactNode;
}

export interface SelectListProps {
  items: SelectListItem[];
  selected: string;
  onSelect: (key: string) => void;
  theme?: ComponentTheme;
}

export function SelectList({
  selected,
  items,
  onSelect,
  theme = "primary",
}: SelectListProps) {
  return (
    <div className={"select-list " + theme}>
      {items.map((i) => (
        <div
          key={i.key}
          className={composeClass("select-list__item", {
            selected: i.key == selected,
          })}
          onClick={() => onSelect(i.key)}
        >
          {i.value}
        </div>
      ))}
    </div>
  );
}
