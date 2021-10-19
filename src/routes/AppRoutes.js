import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERS } from "../constants/routers";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ContestsPage,
  ProblemsPage,
  AdminPage,
} from "../pages/index";
// import PrivateRoute from "./PrivateRoute";
import RedirectRoute from "./RedirectRoute";
import { pathPerRole } from "../utils";

const AppRoutes = () => {
  const data = useSelector((state) => state.auth.data);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTERS.HOME} component={HomePage} />
        <RedirectRoute
          path={ROUTERS.LOGIN}
          redirectPath={pathPerRole(data)}
          component={LoginPage}
          exact
        />
        <RedirectRoute
          path={ROUTERS.REGISTER}
          redirectPath={pathPerRole(data)}
          component={RegisterPage}
          exact
        />
        <Route path={ROUTERS.CONTESTS} component={ContestsPage} />
        <Route path={ROUTERS.PROBLEMS} component={ProblemsPage} />
        <Route path={ROUTERS.ADMIN} component={AdminPage} />
        {/* <PrivateRoute path={ROUTERS.ADMIN} component={AdminPage} /> */}
      </Switch>
    </Router>
  );
};

export default AppRoutes;
