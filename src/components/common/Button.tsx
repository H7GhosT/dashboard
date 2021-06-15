import React from "react";

import { addClsToProps, composeClass } from "components/utils";
import { ComponentTheme } from "./types";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  theme?: ComponentTheme;
  variant?: "filled" | "text";
}

export function Button({
  theme = "primary",
  variant = "filled",
  ...props
}: ButtonProps) {
  return (
    <button
      {...addClsToProps(
        props,
        composeClass("button", { [variant]: true }),
        theme
      )}
    ></button>
  );
}
