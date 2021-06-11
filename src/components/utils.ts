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
