import React, { Dispatch, ReactNode, SetStateAction } from "react";

import {
  VSpace,
  Modal,
  Container,
  PaddingXY,
  HSpace,
  Icon,
  Button,
  Alert,
} from "components/common";
import {
  TextField,
  PasswordTextField,
  SelectTextField,
} from "components/text-field";
import { User, UserPermission } from "types";
import { ModalFormProps } from "./types";

export function UserModal({
  data,
  setData,
  top,
  bottom,
  ...modalProps
}: ModalFormProps<User>) {
  return (
    <Modal {...modalProps}>
      <Container size="s" fixed>
        <PaddingXY x={4} y={3}>
          {top}
          <VSpace amount={2} />
          <SelectTextField
            label="Permission"
            selected={data?.permission || ""}
            items={[
              { key: "admin", value: "Admin" },
              { key: "user", value: "User" },
            ]}
            onSelect={(v) =>
              setData((u) => ({
                ...u!,
                permission: v as UserPermission,
              }))
            }
            variant="outlined"
          />
          <VSpace amount={1} />
          <TextField
            value={data?.email}
            type="email"
            onInput={(email) => setData((u) => ({ ...u!, email }))}
            variant="outlined"
            label="Email"
          />
          <VSpace amount={1} />
          <TextField
            value={data?.name}
            type="text"
            onInput={(name) => setData((u) => ({ ...u!, name }))}
            variant="outlined"
            label="Name"
          />
          <VSpace amount={1} />
          <PasswordTextField
            value={data?.password}
            onInput={(password) => setData((u) => ({ ...u!, password }))}
            variant="outlined"
            label="Password"
          />
          <VSpace amount={1} />

          {bottom}
        </PaddingXY>
      </Container>
    </Modal>
  );
}
