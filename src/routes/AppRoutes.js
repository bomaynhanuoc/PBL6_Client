import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERS } from "../constants/routers";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ContestsPage,
  ProblemsPage,
} from "../pages/index";
import RedirectRoute from "./RedirectRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTERS.HOME} component={HomePage} />
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
        <Route path={ROUTERS.CONTESTS} component={ContestsPage} />
        <Route path={ROUTERS.PROBLEMS} component={ProblemsPage} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
