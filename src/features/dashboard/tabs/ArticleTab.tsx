import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { Article } from "types";
import { getAllArticles, updateArticle, addArticle } from "api";
import { ArticleCard } from "../cards";
import { insertBetween } from "utils";
import {
  VSpace,
  Modal,
  Container,
  PaddingXY,
  HSpace,
  Icon,
  Button,
  Alert,
  Loader,
} from "components/common";
import { ArticleModal } from "../modals";
import { emptyArticle } from "types/utils";
import { UserContext } from "contexts/UserContext";

export function ArticleTab() {
  const { user: loggedUser } = useContext(UserContext);

  const {
    data: articles,
    isLoading: isArticlesLoading,
    isError: hasArticlesError,
    refetch,
  } = useQuery<Article[]>("articles", getAllArticles);
  const {
    isLoading: isEditingPending,
    isError: hasEditingError,
    mutate: mutateArticle,
  } = useMutation(updateArticle, {});
  const {
    isLoading: isNewArticlePending,
    isError: hasNewArticleError,
    mutate: mutateNewArticle,
  } = useMutation((article: Article) => addArticle(article), {});
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article>();
  const [newArticle, setNewArticle] = useState<Article | undefined>({
    ...emptyArticle(),
    authorId: loggedUser!.id,
  });

  return (
    <div>
      {hasArticlesError ? (
        <Alert severity="error">Error loading articles</Alert>
      ) : !isArticlesLoading ? (
        <>
          {insertBetween(
            articles?.map((a) => (
              <ArticleCard
                key={a.id}
                data={a}
                onEdit={() => {
                  setEditingArticle(a);
                  setEditingModalOpen(true);
                }}
              />
            )) || [],
            <VSpace amount={1} />
          )}
          <VSpace amount={1} />
          <Button onClick={() => setNewModalOpen(true)}>
            New article
            <HSpace amount={1} />
            <Icon>add</Icon>
          </Button>
          <VSpace amount={1} />
        </>
      ) : (
        <Loader />
      )}
      <ArticleModal
        hasDate
        data={editingArticle}
        setData={setEditingArticle}
        open={editingModalOpen}
        onClose={() => setEditingModalOpen(false)}
        top={<div className="title">Edit article</div>}
        bottom={
          <>
            <div className="flex space-between align-center">
              <Button
                onClick={async () => {
                  mutateArticle(editingArticle!, {
                    onSuccess: () => {
                      refetch();
                      setEditingModalOpen(false);
                    },
                  });
                }}
              >
                Save
                <HSpace amount={1} />
                <Icon>save</Icon>
              </Button>
              {isEditingPending ? <Loader /> : ""}
            </div>
            {hasEditingError ? (
              <>
                <VSpace amount={1} />
                <Alert severity="error">Error saving the article</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
      />
      <ArticleModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        top={<div className="title">New article (by {loggedUser!.name})</div>}
        bottom={
          <>
            <div className="flex space-between align-center">
              <Button
                disabled={isNewArticlePending}
                onClick={async () => {
                  mutateNewArticle(newArticle!, {
                    onSuccess: () => {
                      refetch();
                      setNewModalOpen(false);
                    },
                  });
                }}
              >
                Add
                <HSpace amount={1} />
                <Icon>add</Icon>
              </Button>
              {isNewArticlePending ? <Loader /> : ""}
            </div>
            {hasNewArticleError ? (
              <>
                <VSpace amount={1} />
                <Alert severity="error">Error adding the user</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
        data={newArticle}
        setData={setNewArticle}
      />
    </div>
  );
}
