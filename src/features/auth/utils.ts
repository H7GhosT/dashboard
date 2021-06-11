import { FormUser } from "./../../types/user";

function validateEmpty(str: string | undefined, label: string) {
  return str ? label + " must not be empty" : null;
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase()) ? "Email has an incorrect format" : null;
}

function validatePassword(pass: string) {
  return pass.length < 8 ? "Password must be at least 8 characters" : null;
}

export function validateUser(user: FormUser) {
  const errors = [
    validateEmpty(user.name, "Name"),
    validateEmpty(user.email, "email"),
    validateEmpty(user.name, "Name"),
  ];

  return errors.filter((e) => e != null);
}
