import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { ROUTERS } from "../constants/routers";
import isObject from "../utils/isObject";

function PrivateRoute({ admin, ...rest }) {
  const data = useSelector((state) => state.auth.data);
  const location = useLocation();

  if (isObject(data)) {
    if (data.role === "admin") {
      if (location.pathname !== ROUTERS.ADMIN)
        return <Redirect to={ROUTERS.ADMIN} />;
      return <Route {...rest} />;
    } else {
      if (location.pathname === ROUTERS.ADMIN)
        return <Redirect to={ROUTERS.HOME} />;
      return <Route {...rest} />;
    }
  }

  return <Redirect to={ROUTERS.LOGIN} />;
}

export default PrivateRoute;
