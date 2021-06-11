import React from "react";

import { addClsToProps } from "./utils";

export function Icon(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...addClsToProps(props, "material-icons")}></span>;
}
