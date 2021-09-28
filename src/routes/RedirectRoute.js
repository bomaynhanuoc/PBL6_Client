import React from "react";
import { useHistory, Route } from "react-router-dom";

function RedirectRoute({ redirectedPath, ...rest }) {
  const history = useHistory();
  const isAuthenticated = false;

  if (isAuthenticated) {
    history.push(redirectedPath);
    return null;
  }
  return <Route {...rest} />;
}

export default RedirectRoute;
