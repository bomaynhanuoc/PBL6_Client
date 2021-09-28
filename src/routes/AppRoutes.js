import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ROUTERS } from "../constants/routers";
import { HomePage, LoginPage, RegisterPage } from "../pages/index";
import RedirectRoute from "./RedirectRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <RedirectRoute
          exact
          path={ROUTERS.HOME}
          component={HomePage}
          redirectedPath={ROUTERS.HOME}
        />
        <RedirectRoute
          path={ROUTERS.LOGIN}
          redirectPath={ROUTERS.HOME}
          component={LoginPage}
          exact
        />
        <RedirectRoute
          path={ROUTERS.REGISTER}
          redirectPath={ROUTERS.HOME}
          component={RegisterPage}
          exact
        />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
