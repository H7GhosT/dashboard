import React, { useState } from "react";

import { ITextFieldProps } from "./types";
import { TextField } from "./TextField";
import { Icon } from "components/common";

export function PasswordTextField(
  props: Exclude<ITextFieldProps, "icon" | "onIconClick" | "type">
) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      icon={visible ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
      onIconClick={() => setVisible(!visible)}
    />
  );
}
