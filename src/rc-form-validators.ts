import { emailExists } from "api";
import { FormInstance } from "rc-field-form";

export const emailExistsValidator = async (_: any, email: string) => {
  let exists = false;
  try {
    exists = await emailExists(email);
  } catch {
    return Promise.reject("Unexpected error");
  }

  if (exists) return Promise.reject("Email already exists");
  return Promise.resolve();
};

export const emailValidator = async (_: any, email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && !re.test(email.toLowerCase()))
    return Promise.reject("Email has incorrect format");
  return Promise.resolve();
};

export const makeConfirmPasswordValidator =
  (context: FormInstance) => (_: any, password: string) => {
    if (context.getFieldValue("password") !== password)
      return Promise.reject("Passwords do not match");
    return Promise.resolve();
  };
