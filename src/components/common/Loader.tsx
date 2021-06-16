import React, { useRef } from "react";

import { ComponentSize, ComponentTheme } from "./types";
import { MapType } from "components/utils";

export interface LoaderProps {
  size?: ComponentSize | number;
  theme?: ComponentTheme;
}

const loaderSizeMap: MapType<ComponentSize, number> = {
  s: 30,
  m: 50,
  l: 70,
};

export function Loader({ size = "s", theme = "primary" }: LoaderProps) {
  if (typeof size == "string") size = loaderSizeMap[size];

  return (
    <span
      className={"loader " + theme}
      style={{
        width: size + "px",
        height: size + "px",
        borderWidth: size / 7 + "px",
      }}
    ></span>
  );
}
