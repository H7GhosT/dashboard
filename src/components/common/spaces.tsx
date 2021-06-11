import React from "react";

import { IPaddingXYProps, ISpaceProps } from "./types";

export function VSpace({ amount, ...props }: ISpaceProps) {
  // vertical space
  return (
    <div
      {...props}
      style={{
        paddingTop: amount + "rem",
      }}
    ></div>
  );
}

export function HSpace({ amount, ...props }: ISpaceProps) {
  // horizontal space
  return (
    <span
      {...props}
      style={{
        paddingLeft: amount + "rem",
        display: "inline-block",
      }}
    ></span>
  );
}

export function PaddingXY({ x, y, ...props }: IPaddingXYProps) {
  return (
    <div
      {...props}
      style={{
        padding: y + "rem " + x + "rem",
      }}
    ></div>
  );
}
