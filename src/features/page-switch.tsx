import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { UserContext } from "../user-context";
import { RegisterPage, LoginPage } from "./auth";
import { Icon } from "../components/common/icon";
import { TextButton } from "../components/common/text-button";

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
        <Route path="*">
          <Redirect to="/admin" />
        </Route>
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
      <Route path="*">
        <Redirect to="/register" />
      </Route>
    </Switch>
  );
}
