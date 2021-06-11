import React from "react";

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
}

export interface PaddingXYProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
}

export function VSpace({ amount, ...props }: SpaceProps) {
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

export function HSpace({ amount, ...props }: SpaceProps) {
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

export function PaddingXY({ x, y, ...props }: PaddingXYProps) {
  return (
    <div
      {...props}
      style={{
        padding: y + "rem " + x + "rem",
      }}
    ></div>
  );
}
