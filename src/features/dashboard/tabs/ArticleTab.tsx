import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Article, User } from "types";
import { getAllArticles, updateArticle } from "api";
import { ArticleCard } from "../cards";
import { dateToInputFormat, insertBetween } from "utils";
import {
  VSpace,
  Modal,
  Container,
  PaddingXY,
  HSpace,
  Icon,
  Button,
  Alert,
} from "components/common";
import { TextField } from "components/text-field";

export function ArticleTab() {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article>();

  return (
    <div>
      {hasArticlesError ? (
        <Alert severity="error">Error loading articles</Alert>
      ) : !isArticlesLoading ? (
        insertBetween(
          articles?.map((a) => (
            <ArticleCard
              data={a}
              onEdit={() => {
                setEditingArticle(a);
                console.log(a.dateCreated.toLocaleDateString());
                setModalOpen(true);
              }}
            />
          )) || [],
          <VSpace amount={1} />
        )
      ) : (
        "Loading..."
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Container size="m" fixed>
          <PaddingXY x={4} y={3}>
            <div className="title">Edit article</div>
            <VSpace amount={2} />
            <TextField
              value={editingArticle?.title}
              type="text"
              onInput={(title) => setEditingArticle((a) => ({ ...a!, title }))}
              label="Title"
            />
            <VSpace amount={1} />
            <TextField
              value={dateToInputFormat(editingArticle?.dateCreated)}
              type="date"
              onInput={(date) =>
                setEditingArticle((a) => ({
                  ...a!,
                  dateCreated: new Date(date),
                }))
              }
              label="Date created"
            />
            <VSpace amount={1} />
            <TextField
              value={editingArticle?.content}
              type="text"
              multiline
              onInput={(content) =>
                setEditingArticle((a) => ({
                  ...a!,
                  content,
                }))
              }
              label="Content"
            />
            <VSpace amount={1} />

            <Button
              onClick={async () => {
                mutateArticle(editingArticle!, {
                  onSuccess: () => {
                    refetch();
                    setModalOpen(false);
                  },
                });
              }}
            >
              Save
              <HSpace amount={1} />
              <Icon>save</Icon>
            </Button>
            <br />
            {hasEditingError ? (
              <>
                <VSpace amount={1} />
                <Alert severity="error">Error saving the article</Alert>
              </>
            ) : isEditingPending ? (
              "Pending..."
            ) : (
              ""
            )}
          </PaddingXY>
        </Container>
      </Modal>
    </div>
  );
}
