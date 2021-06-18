import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { Article } from "types";
import { getAllArticles, updateArticle, addArticle } from "api";
import { ArticleCard } from "../cards";
import {
  Button,
  Loader,
  Icon,
  Alert,
  Space,
  Row,
  Col,
  useForm,
} from "ebs-design";
import { ArticleModal } from "../modals";
import { emptyArticle } from "types/utils";
import { UserContext } from "contexts/UserContext";
import { dateToInputFormat } from "../../../utils";

export function ArticleTab() {
  const { user: loggedUser } = useContext(UserContext);
  const fromAdmin = loggedUser?.permission == "admin";

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

  const [newArticleForm] = useForm<Article>();
  const [editArticleForm] = useForm<Article>();

  const [editingArticle, setEditingArticle] = useState(emptyArticle());

  return (
    <div>
      {hasArticlesError ? (
        <Alert type="error">Error loading articles</Alert>
      ) : !isArticlesLoading ? (
        <>
          <Row gy={3}>
            {articles?.map((a) => (
              <ArticleCard
                key={a.id}
                data={a}
                onEdit={() => {
                  editArticleForm.setFieldsValue({
                    ...a,
                    dateCreated: dateToInputFormat(a.dateCreated),
                  });
                  setEditingArticle(a);
                  setEditingModalOpen(true);
                }}
              />
            ))}

            <Col size={12}>
              <Button onClick={() => setNewModalOpen(true)}>New article</Button>
            </Col>
          </Row>
        </>
      ) : (
        <Loader loading={true} />
      )}
      <ArticleModal
        form={editArticleForm}
        hasDate
        open={editingModalOpen}
        onClose={() => setEditingModalOpen(false)}
        title="Edit article"
        bottom={
          <>
            <div>
              <Button
                disabled={isEditingPending}
                onClick={async () => {
                  if (fromAdmin) {
                    try {
                      await editArticleForm.validateFields();
                      let values = {
                        ...editingArticle,
                        ...editArticleForm.getFieldsValue(),
                      };
                      values.dateCreated = new Date(values.dateCreated);
                      mutateArticle(values, {
                        onSuccess: () => {
                          refetch();
                          setEditingModalOpen(false);
                        },
                      });
                    } catch (e) {}
                  }
                }}
              >
                Save
                {isEditingPending ? <Loader.Inline children="" /> : ""}
              </Button>
            </div>

            {hasEditingError ? (
              <>
                <Alert type="error">Error saving the article</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
      />
      <ArticleModal
        form={newArticleForm}
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title={`New article (by ${loggedUser!.name})`}
        bottom={
          <>
            <div>
              <Button
                disabled={isNewArticlePending}
                onClick={async () => {
                  try {
                    await newArticleForm.validateFields();
                    mutateNewArticle(
                      {
                        ...newArticleForm.getFieldsValue(),
                        authorId: loggedUser!.id,
                      },
                      {
                        onSuccess: () => {
                          refetch();
                          setNewModalOpen(false);
                          newArticleForm.resetFields();
                        },
                      }
                    );
                  } catch (e) {}
                }}
              >
                Add
                {isNewArticlePending ? <Loader.Inline children="" /> : ""}
              </Button>
            </div>
            {hasNewArticleError ? (
              <>
                <Alert type="error">Error adding the user</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
      />
    </div>
  );
}
