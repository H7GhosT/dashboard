import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Card, Space, Button, Loader,  Col, Alert } from "ebs-design";

import { Article, User } from "types";
import { deleteArticle, getAllUsers, getUserBy } from "api";
import { CardProps } from "../types";
import { UserContext } from "contexts/UserContext";

export function ArticleCard({ data, onEdit }: CardProps<Article>) {
  const { data: author, isLoading: isAuthorLoading } = useQuery<User | null>(
    ["users", data.authorId],
    () => getUserBy("id", data.authorId),
    {}
  );
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const {
    isLoading: isDeletePending,
    isError: hasDeleteError,
    mutate: mutateDelete,
  } = useMutation(() => deleteArticle(data.id), {});
  const queryClient = useQueryClient();

  return (
    <>
      <Col size={12}>
        <Card size="large" collapsible collapsed>
          <Card.Header bordered>
            <Space align="center" justify="space-between">
              <div>
                <small>
                  <b>
                    {isAuthorLoading ? (
                      <Loader.Inline children="" />
                    ) : author ? (
                      author.name
                    ) : (
                      ""
                    )}
                  </b>{" "}
                  <small>{data.dateCreated.toDateString()}</small>
                </small>
                <h3>{data.title}</h3>
              </div>
              {fromAdmin ? (
                <div className="nowrap">
                  <Button type="text" icon="edit" onClick={onEdit}></Button>
                  {isDeletePending ? (
                    <Button type="text">
                      <Loader.Inline children="" />
                    </Button>
                  ) : (
                    <Button
                      type="text"
                      icon="error"
                      onClick={() => {
                        mutateDelete(undefined, {
                          onSuccess: () =>
                            queryClient.refetchQueries(["articles"], {
                              active: true,
                              stale: true,
                              exact: true,
                            }),
                        });
                      }}
                    ></Button>
                  )}
                </div>
              ) : (
                ""
              )}
            </Space>
          </Card.Header>

          <Card.Body>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {data.content}
            </pre>
          </Card.Body>
          {hasDeleteError ? (
            <Card.Footer>
              <Alert type="error">Error deleting the article</Alert>
            </Card.Footer>
          ) : (
            ""
          )}
        </Card>
      </Col>
    </>
  );
}
