import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { Alert, Loader } from "ebs-design";

import { addArticle, getArticleBy, updateArticle } from "api";
import { ArticleForm } from "../forms/ArticleForm";
import { Article } from "types";
import { UserContext } from "contexts/UserContext";

export function CreateArticleTab() {
  const history = useHistory();
  const authorId = useContext(UserContext).user!.id;

  const createMutation = useMutation(
    async (values: Article) => {
      return addArticle({ ...values!, authorId });
    },
    {
      onSuccess: ({ id }) => {
        history.push("/dashboard/articles/" + id);
      },
    }
  );

  return (
    <ArticleForm
      mutation={createMutation}
      submitText="Add"
      submitErrorMessage="Error adding the user"
    />
  );
}
