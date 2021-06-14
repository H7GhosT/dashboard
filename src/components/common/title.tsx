import React from "react";

import { addClsToProps } from "components/utils";

export function Title(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...addClsToProps(props, "title")}></div>;
}
