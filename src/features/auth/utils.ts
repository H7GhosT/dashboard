import { emailExists } from "api/users";
import { FormUser } from "types";

export type Validator =
  | ((s: string) => string | null)
  | ((s: string) => Promise<string | null>);

export function createEmptyValidator(label: string) {
  return (s: string) => (!s ? label + " must not be empty" : null);
}

export function emailValidator(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email.toLowerCase()) ? "Email has an incorrect format" : null;
}

export async function emailExistsValidator(email: string) {
  return (await emailExists(email)) ? "Email already exists" : null;
}

export function passwordValidator(pass: string) {
  return pass.length < 8 ? "Password must have at least 8 characters" : null;
}

export async function validateWith(
  s: string,
  validators: Validator[]
): Promise<string | null> {
  let result = null;
  for (let i = 0; i < validators.length && !result; i++) {
    result = validators[i](s);
    if (result instanceof Promise) result = await result;
  }

  return result;
}

export interface UserValidationResult {
  errors: string[];
  hasError: { [key in keyof FormUser]: boolean };
  isValid: boolean;
}

export interface UserValidators {
  name?: Validator[];
  email?: Validator[];
  password?: Validator[];
}

export async function validateUser(
  user: FormUser,
  validators: UserValidators
): Promise<UserValidationResult> {
  const result: UserValidationResult = {
    errors: [],
    hasError: {},
    isValid: false,
  };

  const fields: (keyof FormUser)[] = ["name", "email", "password"];
  for await (const f of fields) {
    if (user[f] !== undefined && validators[f] !== undefined) {
      let v;
      v = await validateWith(user[f]!, validators[f]!);
      if (v) result.errors.push(v);
      if (v) result.hasError[f] = true;
    }
  }

  result.isValid = !result.errors.length;

  return result;
}

export function trimUser(user: FormUser) {
  return {
    name: user.name?.trim(),
    email: user.email?.trim(),
    password: user.password,
  };
}
