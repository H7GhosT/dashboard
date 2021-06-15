import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "../AuthForm";
import { createEmptyValidator } from "../utils";
import { getUserBy } from "api/users";
import { UserContext } from "contexts/UserContext";

export function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <AuthForm
      title="Login"
      fields={["email", "password"]}
      link={<Link to="/register">Register</Link>}
      onSubmit={async (user) => {
        const candidate = await getUserBy("email", user.email!);
        if (!candidate) {
          setErrors(["User does not exist"]);
          return;
        }
        if (candidate.password !== user.password) {
          setErrors(["Incorrect password"]);
          return;
        }
        loginUser(candidate);
      }}
      validators={{
        email: [createEmptyValidator("Email")],
        password: [createEmptyValidator("Password")],
      }}
      otherErrors={errors}
    ></AuthForm>
  );
}
