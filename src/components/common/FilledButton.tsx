import React from "react";

import { ButtonProps } from "./types";
import { addClsToProps } from "components/utils";

export function FilledButton({ theme = "primary", ...props }: ButtonProps) {
  return <button {...addClsToProps(props, "filled-button", theme)}></button>;
}
