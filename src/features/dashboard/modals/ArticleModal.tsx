import React from "react";

import { Modal, Form, Input, Calendar, Textarea, DatePicker } from "ebs-design";

import { Article } from "types";
import { ModalFormProps } from "./types";

export interface ArticleModalProps extends ModalFormProps<Article> {
  hasDate?: boolean;
}
export function ArticleModal({
  form,
  title,
  bottom,
  hasDate = false,
  open,
  onClose,
}: ArticleModalProps) {
  return open ? (
    <Modal title={title} onClose={onClose}>
      <Modal.Content>
        <Form form={form}>
          <Form.Field name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Field>
          {hasDate ? (
            <Form.Field
              name="dateCreated"
              label="Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Field>
          ) : (
            ""
          )}
          <Form.Field
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Textarea />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Footer>{bottom}</Modal.Footer>
    </Modal>
  ) : (
    <></>
  );
}
