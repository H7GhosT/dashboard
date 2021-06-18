import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { RegisterPage, LoginPage } from "./auth";
import { UserContext } from "contexts/UserContext";
import { DashboardPage } from "./dashboard";

export function PageSwitch() {
  const { user } = useContext(UserContext);

  return user ? (
    <Switch>
      <Route path="/dashboard">
        <Switch>
          <DashboardPage />
        </Switch>
      </Route>

      <Redirect to="/dashboard" />
    </Switch>
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
