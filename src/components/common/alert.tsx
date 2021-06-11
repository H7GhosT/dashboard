import React from "react";

import { AlertSeverity, IAlertProps } from "./types";
import { MapType } from "../types";
import { Icon } from "./icon";
import { HSpace } from "./spaces";

const alertIconNameMap: MapType<AlertSeverity, string> = {
  error: "error_outline",
  warning: "warning_amber",
  info: "info",
  success: "task_alt",
};

export function Alert({ severity, children }: IAlertProps) {
  return (
    <div className={"alert " + severity}>
      <Icon>{alertIconNameMap[severity]}</Icon>
      <HSpace amount={1} />
      <div>{children}</div>
    </div>
  );
}
