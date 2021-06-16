import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { User, UserPermission } from "types";
import { getAllUsers } from "api";
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
} from "components/common";
import { TextField, PasswordTextField } from "components/text-field";
import { updateUser } from "api/users";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();

  return (
    <div>
      {hasUsersError ? (
        <Alert severity="error">Error loading users</Alert>
      ) : !isUsersLoading ? (
        insertBetween(
          users?.map((u) => (
            <UserCard
              data={u}
              onEdit={() => {
                setEditingUser(u);
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
        <Container size="s" fixed>
          <PaddingXY x={4} y={3}>
            <div className="title">Edit user</div>
            <VSpace amount={2} />
            <select
              onChange={(e) =>
                setEditingUser((u) => ({
                  ...u!,
                  permission: e.target.value as UserPermission,
                }))
              }
            >
              <option
                selected={editingUser?.permission == "admin"}
                value="admin"
              >
                Admin
              </option>
              <option selected={editingUser?.permission == "user"} value="user">
                User
              </option>
            </select>
            <VSpace amount={1} />
            <TextField
              value={editingUser?.email}
              type="email"
              onInput={(email) => setEditingUser((u) => ({ ...u!, email }))}
              variant="outlined"
              label="Email"
            />
            <VSpace amount={1} />
            <TextField
              value={editingUser?.name}
              type="text"
              onInput={(name) => setEditingUser((u) => ({ ...u!, name }))}
              variant="outlined"
              label="Name"
            />
            <VSpace amount={1} />
            <PasswordTextField
              value={editingUser?.password}
              onInput={(password) =>
                setEditingUser((u) => ({ ...u!, password }))
              }
              variant="outlined"
              label="Password"
            />
            <VSpace amount={1} />
            <Button
              onClick={async () => {
                mutateUser(editingUser!, {
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
                <Alert severity="error">Error saving the user</Alert>
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
