import React from "react";

import { addClsToProps } from "components/utils";

export function Icon(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...addClsToProps(props, "material-icons")}></span>;
}
