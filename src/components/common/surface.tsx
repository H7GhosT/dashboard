import React from "react";

import { addClsToProps } from "components/utils";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation: number;
}

export function Surface({ elevation, ...props }: SurfaceProps) {
  return (
    <div {...addClsToProps(props, "surface elevation-" + elevation)}></div>
  );
}
