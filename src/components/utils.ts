import React from "react";

export function composeClass(
  className: string,
  modifiers: { [key: string]: boolean }
) {
  return [
    className,
    ...Object.entries(modifiers).map((e) =>
      e[1] ? className + "--" + e[0] : ""
    ),
  ].join(" ");
}

export function addClsToProps(
  props: React.HTMLAttributes<HTMLElement>,
  ...classNames: string[]
) {
  return {
    ...props,
    className: [props.className || "", ...classNames].join(" "),
  };
}
