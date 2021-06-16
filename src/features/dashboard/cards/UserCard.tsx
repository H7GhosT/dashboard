import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { User } from "types";
import {
  PaddingXY,
  Surface,
  Container,
  Button,
  Icon,
  Loader,
  Alert,
} from "components/common";
import { CardProps } from "../types";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { deleteUser } from "api";

export function UserCard({ data, onEdit }: CardProps<User>) {
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const {
    isLoading: isDeletingPending,
    isError: hasDeletingError,
    mutate: mutateDelete,
  } = useMutation(() => deleteUser(data.id), {});
  const queryClient = useQueryClient();

  return (
    <Container size="s" fixed>
      <Surface elevation={2}>
        <PaddingXY x={2} y={1}>
          <div className="flex align-center space-between">
            <div>
              <div>
                <span className="bold">{data.name}</span> -{" "}
                <span className="small">{data.permission}</span>
              </div>
              <div className="text-gray small bold">{data.email}</div>
              {fromAdmin ? (
                <div className="small">
                  Password: <span className="text-gray">{data.password}</span>
                </div>
              ) : (
                ""
              )}
            </div>
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
                        queryClient.refetchQueries(["users"], {
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
          {isDeletingPending ? <Loader /> : ""}
          {hasDeletingError ? (
            <Alert severity="error">Error deleting the user</Alert>
          ) : (
            ""
          )}
        </PaddingXY>
      </Surface>
    </Container>
  );
}
