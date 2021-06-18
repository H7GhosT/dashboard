import React from "react";

import { Modal, Form, Input, InputSelect } from "ebs-design";

import { User, UserPermission } from "types";
import { ModalFormProps } from "./types";
import { emailExistsValidator, emailValidator } from "rc-form-validators";

export interface UserModalFormProps extends ModalFormProps<User> {
  checkEmailExists?: boolean;
}

export function UserModal({
  title,
  form,
  bottom,
  onClose,
  open,
  checkEmailExists = false,
}: UserModalFormProps) {
  return open ? (
    <Modal title={title} onClose={onClose}>
      <Modal.Content>
        <Form form={form}>
          <Form.Field
            initialValue="user"
            name="permission"
            label="Permission"
            rules={[{ required: true }]}
          >
            <InputSelect
              options={[
                { text: "Admin", value: "admin" },
                { text: "User", value: "user" },
              ]}
            />
          </Form.Field>
          <Form.Field name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Field>
          <Form.Field
            name="email"
            label="Email"
            rules={[
              { required: true },
              { validator: emailValidator },
              checkEmailExists ? { validator: emailExistsValidator } : {},
            ]}
          >
            <Input type="email" />
          </Form.Field>
          <Form.Field
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Footer>{bottom}</Modal.Footer>
    </Modal>
  ) : (
    <></>
  );
}
