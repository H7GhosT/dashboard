import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Alert, Row, Button, Col, Loader, useForm } from "ebs-design";

import { User } from "types";
import { getAllUsers, registerUser, updateUser } from "api";
import { UserCard } from "../cards";
import { UserModal } from "../modals";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";

export function UserTab() {
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: hasUsersError,
    refetch,
  } = useQuery<User[]>("users", getAllUsers);
  const {
    isLoading: isEditingPending,
    isError: hasEditingError,
    mutate: mutateUser,
  } = useMutation(updateUser, {});
  const {
    isLoading: isNewUserPending,
    isError: hasNewUserError,
    mutate: mutateNewUser,
  } = useMutation((user: User) => registerUser(user, user.permission), {});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);

  const [newUserForm] = useForm<User>();
  const [editUserForm] = useForm<User>();

  const [editingUser, setEditingUser] = useState<User>();

  const editHandler = async () => {
    if (fromAdmin) {
      try {
        await editUserForm.validateFields();
        mutateUser(
          { ...editingUser, ...editUserForm.getFieldsValue() },
          {
            onSuccess: () => {
              refetch();
              setEditModalOpen(false);
            },
          }
        );
      } catch (e) {}
    }
  };

  const newHandler = async () => {
    try {
      await newUserForm.validateFields();
      mutateNewUser(newUserForm.getFieldsValue(), {
        onSuccess: () => {
          refetch();
          setNewModalOpen(false);
          newUserForm.resetFields();
        },
      });
    } catch (e) {}
  };

  return (
    <div>
      {hasUsersError ? (
        <Alert type="error">Error loading users</Alert>
      ) : !isUsersLoading ? (
        <>
          <Row gy={3}>
            {users?.map((u) => (
              <UserCard
                key={u.id}
                data={u}
                onEdit={() => {
                  setEditingUser(u);
                  editUserForm.setFieldsValue(u);
                  setEditModalOpen(true);
                }}
              />
            ))}
            {fromAdmin ? (
              <>
                <Col size={12}>
                  <Button onClick={() => setNewModalOpen(true)}>
                    New user
                  </Button>
                </Col>
              </>
            ) : (
              ""
            )}
          </Row>
        </>
      ) : (
        <Loader loading />
      )}
      <UserModal
        form={editUserForm}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit user"
        bottom={
          <>
            <div>
              <Button disabled={isEditingPending} onClick={editHandler}>
                Save
                {isEditingPending ? <Loader.Inline children="" /> : ""}
              </Button>
            </div>

            {hasEditingError ? (
              <>
                <Alert type="error">Error saving the user</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
      />
      <UserModal
        checkEmailExists
        form={newUserForm}
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="New user"
        bottom={
          <>
            <div>
              <Button disabled={isNewUserPending} onClick={newHandler}>
                Add
                {isNewUserPending ? <Loader.Inline children="" /> : ""}
              </Button>
            </div>
            {hasNewUserError ? (
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
/*



*/
