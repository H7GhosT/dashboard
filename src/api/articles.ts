import { v1 as uuidv1 } from "uuid";

import { Article } from "types";
import { SERVER_URL } from "./config";

export async function getAllArticles() {
  const response = await fetch(SERVER_URL + "/articles");
  const data: Article[] = await response.json();

  return data.map((a) => ({
    ...a,
    dateCreated: new Date(a.dateCreated),
  })) as Article[];
}

export async function updateArticle(article: Article) {
  return await fetch(SERVER_URL + "/articles/" + article.id, {
    method: "PUT",
    body: JSON.stringify(article),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteArticle(id: string) {
  return await fetch(SERVER_URL + "/articles/" + id, {
    method: "DELETE",
  });
}

export async function addArticle({
  title,
  content,
  authorId,
}: Article): Promise<Article> {
  const response = await fetch(SERVER_URL + "/articles", {
    method: "POST",
    body: JSON.stringify({
      id: uuidv1(),
      authorId,
      title,
      content,
      dateCreated: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getArticleBy(what: string, value: string) {
  const response = await fetch(SERVER_URL + "/articles?" + what + "=" + value);
  const data: Article[] = await response.json();
  return data.length
    ? { ...data[0], dateCreated: new Date(data[0].dateCreated) }
    : null;
}
