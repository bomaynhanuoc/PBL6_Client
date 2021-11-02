import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { ROUTERS } from "../constants/routers";
import isObject from "../utils/isObject";

function PrivateRoute({ ...rest }) {
  const data = useSelector((state) => state.auth.data);

  if (isObject(data)) {
    return <Route {...rest} />;
  }

  return <Redirect to={ROUTERS.LOGIN} />;
}

export default PrivateRoute;
