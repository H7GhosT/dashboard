import React from "react";

import { ComponentTheme } from "./types";
import { MapType } from "../types";
import { Icon } from "./icon";
import { HSpace } from "./spaces";

export type AlertSeverity = Exclude<ComponentTheme, "primary" | "secondary">;

export interface AlertProps {
  severity: AlertSeverity;
  children: React.ReactNode;
}

const alertIconNameMap: MapType<AlertSeverity, string> = {
  error: "error_outline",
  warning: "warning_amber",
  info: "info",
  success: "task_alt",
};

export function Alert({ severity, children }: AlertProps) {
  return (
    <div className={"alert " + severity}>
      <Icon>{alertIconNameMap[severity]}</Icon>
      <HSpace amount={1} />
      <div>{children}</div>
    </div>
  );
}
