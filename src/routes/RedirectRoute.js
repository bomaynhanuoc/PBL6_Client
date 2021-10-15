import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function RedirectRoute({ redirectPath, ...rest }) {
  const data = useSelector((state) => state.auth.data);

  if (data && data.username) {
    return <Redirect to={redirectPath} />;
  }
  return <Route {...rest} />;
}

export default RedirectRoute;
