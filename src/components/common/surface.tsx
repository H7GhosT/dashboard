import React from "react";

import { ISurfaceProps } from "./types";
import { addClsToProps } from "./utils";

export function Surface(props: ISurfaceProps) {
  return (
    <div
      {...addClsToProps(props, "surface elevation-" + props.elevation)}
    ></div>
  );
}
