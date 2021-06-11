import React, { FormEvent, useState } from "react";
import {} from "react-query";
import { registerUser } from "../../api/users";

import {
  Alert,
  Container,
  FullView,
  Icon,
  Surface,
  TextButton,
  Title,
} from "../../components/common";
import { PaddingXY, VSpace } from "../../components/common/spaces";
import { PasswordTextField, TextField } from "../../components/text-field";
import { FormUser } from "../../types/user";

export function RegisterPage() {
  const [user, setUser] = useState<FormUser>({
    name: "",
    email: "",
    password: "",
  });

  const changeUser = (key: string, value: any) => {
    setUser((u) => ({ ...u, [key]: value }));
  };

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<React.ReactNode[]>([]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;

    user.name = user.name?.trim();
    user.email = user.email?.trim();
    user.password = user.password?.trim();

    const valid = !!(user.name && user.email && user.password);

    setErrors([]);
    if (!valid) {
      setErrors(["Invalid input"]);
      return;
    }

    setPending(true);
    let response = { status: 400 };
    try {
      response = await registerUser(user);
    } catch {}

    if (response.status >= 400) {
      setErrors(["Unexpected error"]);
    } else if (response.status >= 500) {
      setErrors(["Server error"]);
    }
    setPending(false);
  };
  return (
    <FullView>
      <VSpace amount={10} />
      <Container size="s">
        <Surface elevation={4}>
          <PaddingXY x={4} y={2}>
            <form onSubmit={onSubmit}>
              <Title>Register</Title>
              <VSpace amount={2} />
              <TextField
                label="Name"
                value={user.name}
                inputHandler={(v) => changeUser("name", v)}
                icon={<Icon>person</Icon>}
              />
              <VSpace amount={1} />
              <TextField
                label="Email"
                value={user.email}
                inputHandler={(v) => changeUser("email", v)}
                icon={<Icon>mail</Icon>}
              />
              <VSpace amount={1} />
              <PasswordTextField
                label="Password"
                value={user.password}
                inputHandler={(v) => changeUser("password", v)}
              />
              <VSpace amount={1} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextButton type="submit" disabled={pending}>
                  Submit
                </TextButton>
                <a href="./">Login</a>
              </div>
              <VSpace amount={1} />
              {errors.map((e) => (
                <Alert severity="error">{e}</Alert>
              ))}
            </form>
          </PaddingXY>
        </Surface>
      </Container>
    </FullView>
  );
}
