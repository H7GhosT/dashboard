import React from "react";

export interface ITextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onInput?: (value: string) => void;
  icon?: React.ReactNode;
  onIconClick?: React.MouseEventHandler;
  error?: boolean;
  helperText?: React.ReactNode;
}
