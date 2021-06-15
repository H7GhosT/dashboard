import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RegisterPage, LoginPage } from "./auth";
import { Icon, Button } from "components/common";
import { UserContext } from "contexts/UserContext";

export function PageSwitch() {
  const { user, logout } = useContext(UserContext);

  return user ? (
    user.permission == "admin" ? (
      <Switch>
        <Route path="/admin">
          Admin page{" "}
          <Button variant="text">
            <Icon onClick={logout}>logout</Icon>
          </Button>
        </Route>
        <Redirect to="/admin" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/dashboard">
          Dashboard
          <Button variant="text">
            <Icon onClick={logout}>logout</Icon>
          </Button>
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
