import React from "react";
import { isError, useQuery } from "react-query";

import { Alert, Loader } from "ebs-design";

import { getArticleBy } from "api";
import { ArticleCard } from "../cards";
import { useHistory, useParams } from "react-router-dom";

export function ViewArticleTab() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const {
    data,
    isLoading,
    isError: hasError,
  } = useQuery(["articles", id], () => getArticleBy("id", id));

  return hasError ? (
    <Alert type="error">Error loading the article</Alert>
  ) : isLoading ? (
    <Loader loading />
  ) : (
    <ArticleCard
      afterDelete={() => history.push("/dashboard/articles")}
      onEdit={() => {}}
      data={data!}
    />
  );
}
