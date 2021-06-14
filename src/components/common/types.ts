import React from "react";

export type ComponentTheme =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  theme?: ComponentTheme;
}
