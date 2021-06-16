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
import { ArticleCard } from "./cards/ArticleCard";
import { insertBetween } from "utils";
import { UserTab, ArticleTab } from "./tabs";

export function DashboardPage() {
  const [selected, setSelected] = useState("articles");

  const { user, logout } = useContext(UserContext);

  const {
    data: articles,
    isLoading: isArticlesLoading,
    refetch: refetchArticles,
  } = useQuery<Article[]>("articles", getAllArticles);

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
            theme="success"
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
          {selected == "users" ? <UserTab /> : <ArticleTab />}
          <VSpace amount={1} />
        </div>
      </div>
    </div>
  );
}
