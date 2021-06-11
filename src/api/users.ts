import { v1 as uuidv1 } from "uuid";

import { SERVER_URL } from "./config";
import { FormUser } from "../types/user";

export function registerUser({ name, email, password }: FormUser) {
  return fetch(SERVER_URL + "/users", {
    method: "POST",
    body: JSON.stringify({
      id: uuidv1(),
      name,
      email,
      password,
      permission: "user",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
