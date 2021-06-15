import { Article } from "types";
import { SERVER_URL } from "./config";

export async function getAllArticles() {
  const response = await fetch(SERVER_URL + "/articles");
  const data: Article[] = await response.json();

  return data.map((a) => ({ ...a, dateCreated: new Date(a.dateCreated) }));
}
