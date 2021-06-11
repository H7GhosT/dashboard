import React from "react";

import { ComponentTheme } from "./types";
import { addClsToProps } from "../utils";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  theme?: ComponentTheme;
}

export function TextButton({ theme = "primary", ...props }: ButtonProps) {
  return <button {...addClsToProps(props, "text-button", theme)}></button>;
}
