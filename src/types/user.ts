export type UserPermission = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  permission: UserPermission;
}

export interface FormUser extends Partial<Omit<User, "id" | "permission">> {}
