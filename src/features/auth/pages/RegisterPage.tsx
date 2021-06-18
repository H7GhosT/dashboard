import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Form,
  useForm,
  Input,
  Button,
  Alert,
  Space,
  Row,
  Col,
  Loader,
  Card,
} from "ebs-design";

import { registerUser } from "api/users";
import { FormUser, User } from "types";
import { UserContext } from "contexts/UserContext";

import {
  emailExistsValidator,
  emailValidator,
  makeConfirmPasswordValidator,
} from "rc-form-validators";
import { useMutation } from "react-query";

export function RegisterPage() {
  const { loginUser } = useContext(UserContext);
  const {
    isLoading: isRegisterPending,
    isError: hasRegisterError,
    mutate: mutateRegister,
  } = useMutation(registerUser, {});

  const [form] = useForm<FormUser>();

  return (
    <>
      <Row gy={5}>
        <Col size={12}></Col>
        <Col size={6} offset={3}>
          <Card>
            <Card.Body>
              <Form
                form={form}
                onFinish={(user: User) => {
                  mutateRegister(user, {
                    onSuccess: (user: User) => loginUser(user),
                  });
                }}
                type="horizontal"
                labelOptions={{ col: { size: 2 } }}
                controlOptions={{ col: { size: 8 } }}
              >
                <Form.Field
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Field>
                <Form.Field
                  name="email"
                  label="Email"
                  rules={[
                    { required: true },
                    { validator: emailValidator },
                    {
                      validator: emailExistsValidator,
                      validateTrigger: ["onSubmit"],
                    },
                  ]}
                >
                  <Input />
                </Form.Field>
                <Form.Field
                  name="password"
                  label="Password"
                  rules={[{ required: true, min: 6 }]}
                >
                  <Input type="password" />
                </Form.Field>
                <Form.Field
                  name="confirmPassword"
                  label="Confirm password"
                  rules={[
                    { required: true },
                    (context) => ({
                      validator: makeConfirmPasswordValidator(context),
                    }),
                  ]}
                >
                  <Input type="password" />
                </Form.Field>
                <Row>
                  <Col offset={2} size={8}>
                    <Space justify="space-between">
                      <Button submit>
                        Submit{" "}
                        {isRegisterPending ? <Loader.Inline children="" /> : ""}
                      </Button>
                      <Link to="/login">Login</Link>
                    </Space>
                  </Col>
                </Row>
              </Form>
              <br />
              <Row>
                <Col offset={2} size={6}>
                  {hasRegisterError ? (
                    <Alert type="error" icon>
                      Error during register
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
