import React from "react";

export function addClsToProps(
  props: React.HTMLAttributes<HTMLElement>,
  ...classNames: string[]
) {
  return {
    ...props,
    className: [props.className || "", ...classNames].join(" "),
  };
}
