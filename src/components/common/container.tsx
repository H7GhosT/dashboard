import React from "react";

import { MapType } from "../types";
import { addClsToProps } from "../utils";

export type ContainerSize = "s" | "m" | "l";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ContainerSize;
}

const containerSizeMap: MapType<ContainerSize, number> = {
  s: 500,
  m: 720,
  l: 1200,
};

export function Container({ size, ...props }: ContainerProps) {
  return (
    <div
      {...addClsToProps(props, "container")}
      style={{ maxWidth: containerSizeMap[size] + "px" }}
    ></div>
  );
}
