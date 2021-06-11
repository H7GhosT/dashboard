import React from "react";

import { addClsToProps } from "./utils";

export function FullView(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...addClsToProps(props, "full-view")}></div>;
}
