import React, { FormEvent, ReactNode, useState } from "react";
import { useMutation } from "react-query";

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
import {
  trimUser,
  validateUser,
  UserValidationResult,
  UserValidators,
} from "./utils";
import { insertBetween } from "../../utils";
import { FilledButton } from "../../components/common/filled-button";

export interface AuthFormProps {
  title: string;
  fields: (keyof FormUser)[];
  submitHandler: (user: FormUser) => Promise<any>;
  link: ReactNode;
  validators: UserValidators;
  otherErrors?: string[];
}

export function AuthForm({
  title,
  fields,
  submitHandler,
  link,
  validators,
  otherErrors = [],
}: AuthFormProps) {
  const [user, setUser] = useState<FormUser>({
    name: fields.includes("name") ? "" : undefined,
    email: fields.includes("email") ? "" : undefined,
    password: fields.includes("password") ? "" : undefined,
  });

  const changeUser = (key: string, value: any) => {
    setUser((u) => ({ ...u, [key]: value }));
  };

  const validationEmpty = {
    errors: [],
    hasError: {},
    isValid: true,
  };
  const [validation, setValidation] =
    useState<UserValidationResult>(validationEmpty);

  const { mutate, isLoading } = useMutation(
    async (user: FormUser) => {
      user = trimUser(user);
      const validation = await validateUser(user, validators);
      setValidation(validation);

      if (validation.isValid) {
        await submitHandler(user);
      }
    },
    {
      onError: () => {
        setValidation({ ...validationEmpty, errors: ["Unexpected error"] });
      },
    }
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <FullView>
      <VSpace amount={10} />
      <Container size="s">
        <Surface elevation={4}>
          <PaddingXY x={4} y={2}>
            <form onSubmit={onSubmit}>
              <Title>{title}</Title>
              <VSpace amount={2} />
              {fields.includes("name") ? (
                <>
                  <TextField
                    label="Name"
                    value={user.name}
                    inputHandler={(v) => changeUser("name", v)}
                    icon={<Icon>person</Icon>}
                    error={validation.hasError.name}
                  />
                  <VSpace amount={1} />
                </>
              ) : (
                <></>
              )}
              {fields.includes("email") ? (
                <>
                  <TextField
                    label="Email"
                    value={user.email}
                    inputHandler={(v) => changeUser("email", v)}
                    icon={<Icon>mail</Icon>}
                    error={validation.hasError.email}
                  />
                  <VSpace amount={1} />
                </>
              ) : (
                <></>
              )}
              {fields.includes("password") ? (
                <>
                  <PasswordTextField
                    label="Password"
                    value={user.password}
                    inputHandler={(v) => changeUser("password", v)}
                    error={validation.hasError.password}
                  />
                  <VSpace amount={1} />
                </>
              ) : (
                <></>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FilledButton type="submit" disabled={isLoading}>
                  Submit
                </FilledButton>
                {link}
              </div>
              <VSpace amount={1} />
              {insertBetween(
                validation.errors
                  .concat(otherErrors)
                  .map((e) => <Alert severity="error">{e}</Alert>),
                <VSpace amount={1} />
              )}
            </form>
          </PaddingXY>
        </Surface>
      </Container>
    </FullView>
  );
}
