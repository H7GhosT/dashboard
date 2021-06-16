import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Article } from "types";
import {
  PaddingXY,
  Surface,
  Container,
  HSpace,
  VSpace,
  Button,
  Icon,
  Loader,
  Alert,
} from "components/common";
import { deleteArticle, getAllUsers } from "api";
import { CardProps } from "../types";
import { UserContext } from "contexts/UserContext";

export function ArticleCard({ data, onEdit }: CardProps<Article>) {
  const { data: users } = useQuery("users", getAllUsers);
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const {
    isLoading: isDeletingPending,
    isError: hasDeletingError,
    mutate: mutateDelete,
  } = useMutation(() => deleteArticle(data.id), {});
  const queryClient = useQueryClient();

  return (
    <Container size="m">
      <Surface elevation={3}>
        <PaddingXY x={3} y={2}>
          <div>
            <span className="text-gray bold small">
              {users?.find((u) => u.id == data.authorId)?.name}
            </span>
            <HSpace amount={1} />
            <span className="small">{data.dateCreated.toDateString()}</span>
          </div>
          <div className="flex space-between align-center">
            <div className="title">{data.title}</div>
            <HSpace amount={1} />
            {fromAdmin ? (
              <div className="nowrap">
                <Button theme="info" variant="text" onClick={onEdit}>
                  <Icon>edit</Icon>
                </Button>
                <Button
                  theme="error"
                  variant="text"
                  onClick={() => {
                    mutateDelete(undefined, {
                      onSuccess: () =>
                        queryClient.refetchQueries(["articles"], {
                          stale: true,
                          exact: true,
                        }),
                    });
                  }}
                >
                  <Icon>delete</Icon>
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
          <HSpace amount={1} />
          <hr />
          <VSpace amount={1} />
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {data.content}
          </pre>
          {isDeletingPending ? <Loader /> : ""}
          {hasDeletingError ? (
            <Alert severity="error">Error deleting the article</Alert>
          ) : (
            ""
          )}
        </PaddingXY>
      </Surface>
    </Container>
  );
}
