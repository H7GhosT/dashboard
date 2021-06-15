import React from "react";

export function autoResize(inpRef: React.RefObject<HTMLTextAreaElement>) {
  setTimeout(() => {
    const $div = document.createElement("div");
    const $inp = (inpRef.current ||
      document.createElement("inp")) as HTMLInputElement;
    $div.innerText = ($inp.value || "") + " ";
    const style = window.getComputedStyle($inp);
    $div.style.cssText = style.cssText;
    $div.style.whiteSpace = "pre-wrap";
    $div.style.wordBreak = "break-word";
    $div.style.height = "initial";
    $div.style.width = style.width;
    document.body.append($div);
    $inp.style.height = $div.clientHeight + "px";
    $div.remove();
  }, 0);
}
