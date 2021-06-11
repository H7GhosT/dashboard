import React from "react";

export type ContainerSize = "s" | "m" | "l";
export type ComponentTheme =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type AlertSeverity = Exclude<ComponentTheme, "primary" | "secondary">;

export interface ISurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation: number;
}

export interface ISpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
}

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ContainerSize;
}

export interface IPaddingXYProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
}

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  theme?: ComponentTheme;
}

export interface IAlertProps {
  severity: AlertSeverity;
  children: React.ReactNode;
}
