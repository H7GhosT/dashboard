import React from "react";

import { addClsToProps } from "../utils";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation: number;
}

export function Surface(props: SurfaceProps) {
  return (
    <div
      {...addClsToProps(props, "surface elevation-" + props.elevation)}
    ></div>
  );
}
