import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RegisterPage, LoginPage } from "./auth";
import { Icon, TextButton } from "components/common";
import { UserContext } from "contexts/UserContext";

export function PageSwitch() {
  const { user, logout } = useContext(UserContext);

  return user ? (
    user.permission == "admin" ? (
      <Switch>
        <Route path="/admin">
          Admin page{" "}
          <TextButton>
            <Icon onClick={logout}>logout</Icon>
          </TextButton>
        </Route>
        <Redirect to="/admin" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/dashboard">
          Dashboard
          <TextButton>
            <Icon onClick={logout}>logout</Icon>
          </TextButton>
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    )
  ) : (
    <Switch>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Redirect to="/register" />
    </Switch>
  );
}
