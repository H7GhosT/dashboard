import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { emptyUser, FormUser, User, UserPermission } from "types";
import { deleteUser, getAllUsers, registerUser, updateUser } from "api";
import { UserCard } from "../cards";
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
import { UserModal } from "../modals";

export function UserTab() {
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
  const [editingUser, setEditingUser] = useState<User>();
  const [newUser, setNewUser] = useState<User | undefined>(emptyUser());

  return (
    <div>
      {hasUsersError ? (
        <Alert severity="error">Error loading users</Alert>
      ) : !isUsersLoading ? (
        <>
          {insertBetween(
            users?.map((u) => (
              <UserCard
                key={u.id}
                data={u}
                onEdit={() => {
                  setEditingUser(u);
                  setEditModalOpen(true);
                }}
              />
            )) || [],
            <VSpace amount={1} />
          )}
          <VSpace amount={1} />
          <Button onClick={() => setNewModalOpen(true)}>
            New user
            <HSpace amount={1} />
            <Icon>add</Icon>
          </Button>
          <VSpace amount={1} />
        </>
      ) : (
        <Loader />
      )}
      <UserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        top={<div className="title">Edit user</div>}
        bottom={
          <>
            <div className="flex space-between align-center">
              <Button
                disabled={isEditingPending}
                onClick={async () => {
                  mutateUser(editingUser!, {
                    onSuccess: () => {
                      refetch();
                      setEditModalOpen(false);
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
                <Alert severity="error">Error saving the user</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
        data={editingUser}
        setData={setEditingUser}
      />
      <UserModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        top={<div className="title">New user</div>}
        bottom={
          <>
            <div className="flex space-between align-center">
              <Button
                disabled={isNewUserPending}
                onClick={async () => {
                  mutateNewUser(newUser!, {
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
              {isNewUserPending ? <Loader /> : ""}
            </div>
            {hasNewUserError ? (
              <>
                <VSpace amount={1} />
                <Alert severity="error">Error adding the user</Alert>
              </>
            ) : (
              ""
            )}
          </>
        }
        data={newUser}
        setData={setNewUser}
      />
    </div>
  );
}
/*



*/
