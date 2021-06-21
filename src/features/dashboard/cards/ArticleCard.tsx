import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { Card, Space, Button, Loader, Col, Alert } from "ebs-design";

import { Article, User } from "types";
import { deleteArticle, getUserBy } from "api";
import { CardProps } from "../types";
import { UserContext } from "contexts/UserContext";

export function ArticleCard({ data, onEdit, afterDelete }: CardProps<Article>) {
  const queryClient = useQueryClient();
  const fromAdmin = useContext(UserContext).user?.permission == "admin";

  const { data: author, isLoading: isAuthorLoading } = useQuery<User | null>(
    ["users", data.authorId],
    () => getUserBy("id", data.authorId),
    {}
  );

  const {
    isLoading: isDeletePending,
    isError: hasDeleteError,
    mutate: mutateDelete,
  } = useMutation(() => deleteArticle(data.id), {});

  const deleteHandler = () => {
    mutateDelete(undefined, {
      onSuccess: () => {
        afterDelete && afterDelete();
        queryClient.refetchQueries(["articles"], {
          active: true,
          stale: true,
          exact: true,
        });
      },
    });
  };

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
              <div className="nowrap">
                <Link to={"/dashboard/articles/" + data.id}>
                  <Button type="text" icon="eye"></Button>
                </Link>
                {fromAdmin && (
                  <>
                    <Link to={"/dashboard/articles/" + data.id + "/edit"}>
                      <Button type="text" icon="edit"></Button>
                    </Link>
                    {isDeletePending ? (
                      <Button type="text">
                        <Loader.Inline children="" />
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        icon="error"
                        onClick={deleteHandler}
                      ></Button>
                    )}
                  </>
                )}
              </div>
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
