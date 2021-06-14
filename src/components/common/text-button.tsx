import React from "react";

import { ButtonProps } from "./types";
import { addClsToProps } from "../utils";

export function TextButton({ theme = "primary", ...props }: ButtonProps) {
  return <button {...addClsToProps(props, "text-button", theme)}></button>;
}
