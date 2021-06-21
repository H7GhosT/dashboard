import React, { useEffect, useContext } from "react";
import { UseMutationResult } from "react-query";

import {
  Form,
  useForm,
  Input,
  DatePicker,
  Textarea,
  Button,
  Loader,
  Alert,
} from "ebs-design";

import { UserContext } from "contexts/UserContext";
import { Article } from "types";

export interface ArticleFormProps {
  data?: Article;
  hasDate?: boolean;
  mutation: UseMutationResult<any, any, Article, any>;
  submitText: string;
  submitErrorMessage: string;
}

export function ArticleForm({
  data,
  mutation,
  submitText,
  submitErrorMessage,hasDate = false
}: ArticleFormProps) {
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const [form] = useForm<Article>();

  useEffect(() => {
    form.setFieldsValue(data || {});
  }, [data]);

  return (
    <Form form={form} onFinish={mutation.mutate}>
      <Form.Field name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Field>
      {hasDate && (
        <Form.Field
          name="dateCreated"
          label="Date"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Field>
      )}
      <Form.Field name="content" label="Content" rules={[{ required: true }]}>
        <Textarea />
      </Form.Field>
      <Button onClick={() => form.submit()}>
        {submitText} {mutation.isLoading && <Loader.Inline children="" />}
      </Button>
      <br />
      {mutation.isError && <Alert type="error">{submitErrorMessage}</Alert>}
    </Form>
  );
}
