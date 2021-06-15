import { v1 as uuidv1 } from "uuid";

import { SERVER_URL } from "./config";
import { FormUser, User } from "../types/user";

export async function emailExists(email: string) {
  const response = await fetch(SERVER_URL + "/users");
  const users: User[] = await response.json();
  return !!users.find((u) => u.email === email);
}

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

export async function getUserBy(what: string, value: string) {
  const response = await fetch(SERVER_URL + "/users?" + what + "=" + value);
  const users: User[] = await response.json();
  return users.length ? users[0] : null;
}
