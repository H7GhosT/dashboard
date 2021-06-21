import React from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { Alert, Loader } from "ebs-design";

import { getArticleBy, updateArticle } from "api";
import { ArticleForm } from "../forms/ArticleForm";
import { Article } from "types";

export function EditArticleTab() {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const {
    data,
    isLoading,
    isError: hasError,
  } = useQuery(["articles", id], () => getArticleBy("id", id));

  const editMutation = useMutation(
    async (values: Article) => {
      updateArticle({ ...values!, id });
    },
    {
      onSuccess: () => {
        history.push("/dashboard/articles/" + id);
      },
    }
  );

  return hasError ? (
    <Alert type="error">Error loading the article</Alert>
  ) : isLoading ? (
    <Loader loading />
  ) : (
    <ArticleForm
      hasDate
      data={data!}
      mutation={editMutation}
      submitText="Save"
      submitErrorMessage="Error saving the user"
    />
  );
}
