import React from "react";
import { useMutation, useQueryClient } from "react-query";

import {
  Col,
  Card,
  Space,
  Loader,
  Button,
  Alert,
  AvatarInline,
} from "ebs-design";

import { CardProps } from "../types";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";
import { deleteUser } from "api";
import { User } from "types";

export function UserCard({ data, onEdit }: CardProps<User>) {
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const {
    isLoading: isDeletePending,
    isError: hasDeleteError,
    mutate: mutateDelete,
  } = useMutation(() => deleteUser(data.id), {});
  const queryClient = useQueryClient();

  return (
    <>
      <Col size={12}>
        <Card size="small">
          <Card.Body>
            <Space align="center" justify="space-between">
              <div>
                <AvatarInline
                  alt={data.name}
                  status="active"
                  description={data.email + " - " + data.permission}
                />

                {fromAdmin ? (
                  <small>
                    <b>Password: </b>
                    {data.password}
                  </small>
                ) : (
                  ""
                )}
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
                            queryClient.refetchQueries(["users"], {
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
          </Card.Body>
          {hasDeleteError ? (
            <Card.Footer>
              <Alert type="error">Error deleting the user</Alert>
            </Card.Footer>
          ) : (
            ""
          )}
        </Card>
      </Col>
    </>
  );
}
