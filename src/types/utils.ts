import { User, Article } from "./";

export const emptyUser = (): User => ({
  id: "",
  name: "",
  email: "",
  password: "",
  permission: "user",
});

export const emptyArticle = (): Article => ({
  id: "",
  authorId: "",
  title: "",
  content: "",
  dateCreated: new Date(),
});
