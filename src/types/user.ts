export type UserPermissoin = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  permission: UserPermissoin;
}

export interface FormUser extends Partial<Omit<User, "id" | "permission">> {}
