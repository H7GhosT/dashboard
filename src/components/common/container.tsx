import React from "react";

import { ContainerSize, IContainerProps } from "./types";
import { MapType } from "../types";
import { addClsToProps } from "./utils";

const containerSizeMap: MapType<ContainerSize, number> = {
  s: 500,
  m: 720,
  l: 1200,
};

export function Container({ size, ...props }: IContainerProps) {
  return (
    <div
      {...addClsToProps(props, "container")}
      style={{ maxWidth: containerSizeMap[size] + "px" }}
    ></div>
  );
}
