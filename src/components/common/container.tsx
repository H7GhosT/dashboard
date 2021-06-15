import React from "react";

import { MapType, addClsToProps } from "components/utils";

export type ContainerSize = "s" | "m" | "l";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ContainerSize | number;
  fixed?: boolean;
}

const containerSizeMap: MapType<ContainerSize, number> = {
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
