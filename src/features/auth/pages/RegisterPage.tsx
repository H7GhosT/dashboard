import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "../AuthForm";
import {
  createEmptyValidator,
  emailExistsValidator,
  emailValidator,
  passwordValidator,
} from "../utils";
import { registerUser } from "api/users";
import { FormUser, User } from "types/user";
import { UserContext } from "contexts/UserContext";

export function RegisterPage() {
  const { loginUser } = useContext(UserContext);
  return (
    <AuthForm
      title="Register"
      fields={["name", "email", "password"]}
      onSubmit={async (user: FormUser) => {
        const response = await registerUser(user);
        const u: User = await response.json();
        loginUser(u);
      }}
      link={<Link to="/login">Login</Link>}
      validators={{
        name: [createEmptyValidator("Name")],
        email: [
          createEmptyValidator("Email"),
          emailValidator,
          emailExistsValidator,
        ],
        password: [passwordValidator],
      }}
    ></AuthForm>
  );
}
