import React, { useState, useContext } from "react";
import { useQuery } from "react-query";

import {
  Container,
  Icon,
  PaddingXY,
  SelectList,
  VSpace,
  Button,
  HSpace,
  Modal,
} from "components/common";
import { TextField, PasswordTextField } from "components/text-field";
import { UserContext } from "contexts/UserContext";
import { getAllArticles, getAllUsers } from "api";
import { User, Article } from "types";
import { ArticleCard } from "./ArticleCard";
import { insertBetween } from "utils";
import { UserCard } from "./UserCard";
import { updateUser } from "api/users";

export interface DashboardPageProps {
  fromAdmin: boolean;
}

export function DashboardPage({ fromAdmin }: DashboardPageProps) {
  const [selected, setSelected] = useState("articles");

  const { user, logout } = useContext(UserContext);

  const {
    data: articles,
    isLoading: isArticlesLoading,
    refetch: refetchArticles,
  } = useQuery<Article[]>("articles", getAllArticles);
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery<User[]>("users", getAllUsers);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();

  return (
    <div className="full-vh flex">
      <div className="side-bar">
        <Container size={300} fixed>
          <PaddingXY x={1} y={2}>
            <div className="flex space-between">
              <div>
                <div className="bold">{user!.name}</div>
                <div className="text-gray small bold">{user!.email}</div>
              </div>
              <Button variant="text" onClick={logout}>
                <Icon>logout</Icon>
              </Button>
            </div>
            <br />
          </PaddingXY>
          <hr />
          <VSpace amount={3} />
          <PaddingXY x={1} y={0}>
            <div className="title">Dashboard</div>
          </PaddingXY>
          <VSpace amount={1} />
          <SelectList
            items={[
              ["users", "Users", "person"],
              ["articles", "Articles", "article"],
            ].map((i) => ({
              key: i[0],
              value: (
                <div className="flex space-between">
                  {i[1]} <Icon>{i[2]}</Icon>
                </div>
              ),
            }))}
            selected={selected}
            onSelect={setSelected}
          />
        </Container>
      </div>
      <HSpace amount={15} />
      <div>
        <VSpace amount={3} />
        <div>
          {insertBetween(
            (selected == "users"
              ? users?.map((u) => (
                  <UserCard
                    fromAdmin={fromAdmin}
                    data={u}
                    onEdit={() => {
                      setEditingUser(u);
                      setModalOpen(true);
                    }}
                  />
                ))
              : selected == "articles"
              ? articles?.map((a) => (
                  <ArticleCard
                    fromAdmin={fromAdmin}
                    data={a}
                    onEdit={() => {}}
                  />
                ))
              : []) || [],
            <VSpace amount={1} />
          )}
          <VSpace amount={1} />
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Container size="s" fixed>
          <PaddingXY x={4} y={3}>
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
                await updateUser(editingUser!);
                refetchUsers();
                setModalOpen(false);
              }}
            >
              Save
              <HSpace amount={1} />
              <Icon>save</Icon>
            </Button>
          </PaddingXY>
        </Container>
      </Modal>
    </div>
  );
}
