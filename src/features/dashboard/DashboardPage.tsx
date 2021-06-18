import React, { useContext } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  Link,
  useParams,
} from "react-router-dom";

import { AvatarInline, Sidebar, Icon, Button, Layout } from "ebs-design";

import { UserContext } from "contexts/UserContext";
import { UserTab, ArticleTab } from "./tabs";

export function DashboardPage() {
  const { user, logout } = useContext(UserContext);
  const {
    location: { pathname },
  } = useHistory();

  return (
    <>
      <Layout>
        <Layout.Topbar>
          <Layout.Topbar.Title>Dashboard</Layout.Topbar.Title>
          <Layout.Topbar.LeftSide>
            <AvatarInline
              alt={user!.name}
              status="active"
              description={user!.email}
            />
          </Layout.Topbar.LeftSide>

          <Layout.Topbar.RightSide>
            <Button onClick={logout}>Logout</Button>
          </Layout.Topbar.RightSide>
        </Layout.Topbar>

        <Sidebar>
          <Sidebar.TopMenu>
            <Link to="/dashboard/articles">
              <Sidebar.Item
                prefix={<Icon type="globe" />}
                text="Articles"
                active={pathname == "/dashboard/articles"}
              />
            </Link>
            <Link to="/dashboard/users">
              <Sidebar.Item
                prefix={<Icon type="users" />}
                text="Users"
                active={pathname == "/dashboard/users"}
              />
            </Link>
          </Sidebar.TopMenu>
        </Sidebar>

        <Layout.Content>
          <Switch>
            <Route path="/dashboard/users">
              <UserTab />
            </Route>
            <Route path="/dashboard/articles">
              <ArticleTab />
            </Route>
            <Redirect to="/dashboard/articles" />
          </Switch>
        </Layout.Content>
      </Layout>
    </>
  );
}
