import { v1 as uuidv1 } from "uuid";

import { SERVER_URL } from "./config";
import { FormUser, User } from "types";
import { UserPermission } from "../types/user";
import { delay } from "utils";

export async function registerUser(
  { name, email, password }: FormUser,
  permission: UserPermission = "user"
): Promise<User> {
  const response = await fetch(SERVER_URL + "/users", {
    method: "POST",
    body: JSON.stringify({
      id: uuidv1(),
      name,
      email,
      password,
      permission,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getUserBy(what: string, value?: string) {
  const response = await fetch(
    SERVER_URL + "/users?" + what + "=" + (value || "")
  );
  const users: User[] = await response.json();
  await delay(Math.random() * 1000);
  return users.length ? users[0] : null;
}

export async function getAllUsers() {
  const reponse = await fetch(SERVER_URL + "/users");
  const data: User[] = await reponse.json();
  return data;
}

export async function updateUser(user: User) {
  const response = await fetch(SERVER_URL + "/users/" + user.id, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function deleteUser(id: string) {
  return await fetch(SERVER_URL + "/users/" + id, {
    method: "DELETE",
  });
}

export async function emailExists(email: string) {
  return !!(await getUserBy("email", email));
}
