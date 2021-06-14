import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "./auth-form";
import { createEmptyValidator } from "./utils";
import { getUserByEmail } from "../../api/users";
import { UserContext } from "../../user-context";

export function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <AuthForm
      title="Login"
      fields={["email", "password"]}
      link={<Link to="/register">Register</Link>}
      submitHandler={async (user) => {
        const candidate = await getUserByEmail(user.email!);
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
