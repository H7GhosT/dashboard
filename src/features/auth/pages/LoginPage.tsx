import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

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

import { getUserBy } from "api/users";
import { FormUser, User } from "types";
import { UserContext } from "contexts/UserContext";

export function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const {
    isLoading: isLoginPending,
    isError: hasLoginError,
    mutate: mutateGetUser,
  } = useMutation(async (email?: string) => getUserBy("email", email), {});

  const [errorMessage, setErrorMessage] = useState("");

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
                onFinish={(user: FormUser) => {
                  mutateGetUser(user.email, {
                    onSuccess: (user: User | null) => {
                      if (user) {
                        if (user.password === form.getFieldValue("password"))
                          loginUser(user);
                        else setErrorMessage("Incorrect password");
                      } else
                        setErrorMessage("User with this email does not exist");
                    },
                  });
                }}
                type="horizontal"
                labelOptions={{ col: { size: 2 } }}
                controlOptions={{ col: { size: 8 } }}
              >
                <Form.Field
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Field>
                <Form.Field
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input type="password" />
                </Form.Field>

                <Row>
                  <Col offset={2} size={6}>
                    <Space justify="space-between">
                      <Button submit>
                        Submit{" "}
                        {isLoginPending ? <Loader.Inline children="" /> : ""}
                      </Button>
                      <Link to="/register">Register</Link>
                    </Space>
                  </Col>
                </Row>
              </Form>
              <br />

              <Row>
                <Col offset={2} size={8}>
                  {hasLoginError ? (
                    <Alert type="error" icon>
                      Error during login
                    </Alert>
                  ) : (
                    ""
                  )}
                  {errorMessage ? (
                    <Alert type="error" icon>
                      {errorMessage}
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
