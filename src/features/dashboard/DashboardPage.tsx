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
import {
  UserTab,
  ArticleTab,
  ViewArticleTab,
  EditArticleTab,
  CreateArticleTab,
} from "./tabs";

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
                active={pathname.startsWith("/dashboard/articles")}
              />
            </Link>
            <Link to="/dashboard/users">
              <Sidebar.Item
                prefix={<Icon type="users" />}
                text="Users"
                active={pathname.startsWith("/dashboard/users")}
              />
            </Link>
          </Sidebar.TopMenu>
        </Sidebar>

        <Layout.Content>
          {/* <div style={{ perspective: "40px" }}> */}
          <div>
            <div
            // style={{
            //   transform: "rotateX(10deg) skew(-4deg, -2deg)",
            //   transformStyle: "preserve-3d",
            // }}
            >
              <Switch>
                {/* <Route path="/dashboard/users/create"></Route>
                <Route path="/dashboard/users/:id/edit"></Route>
                <Route path="/dashboard/users/:id"></Route> */}

                <Route path="/dashboard/articles/create">
                  <CreateArticleTab />
                </Route>
                <Route path="/dashboard/articles/:id/edit">
                  <EditArticleTab />
                </Route>
                <Route path="/dashboard/articles/:id">
                  <ViewArticleTab />
                </Route>

                <Route path="/dashboard/users">
                  <UserTab />
                </Route>
                <Route path="/dashboard/articles">
                  <ArticleTab />
                </Route>
                <Redirect to="/dashboard/articles" />
              </Switch>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
