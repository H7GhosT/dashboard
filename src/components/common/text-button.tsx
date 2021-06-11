import React from "react";

import { IButtonProps } from "./types";
import { addClsToProps } from "./utils";

export function TextButton({ theme = "primary", ...props }: IButtonProps) {
  return <button {...addClsToProps(props, "text-button", theme)}></button>;
}
