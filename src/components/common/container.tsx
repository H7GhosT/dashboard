import React from "react";

import { MapType, addClsToProps } from "components/utils";
import { ComponentSize } from "./types";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ComponentSize | number;
  fixed?: boolean;
}

const containerSizeMap: MapType<ComponentSize, number> = {
  s: 500,
  m: 720,
  l: 1200,
};

export function Container({ size, fixed, ...props }: ContainerProps) {
  return (
    <div
      style={{
        [fixed ? "width" : "maxWidth"]:
          typeof size == "number" ? size + "px" : containerSizeMap[size] + "px",
      }}
      {...addClsToProps(props, "container")}
    ></div>
  );
}
