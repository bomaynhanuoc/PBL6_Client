import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import isObject from "../utils/isObject";

function RedirectRoute({ redirectPath, ...rest }) {
  const data = useSelector((state) => state.auth.data);
  const history = useHistory();

  useEffect(() => {
    if (isObject(data)) {
      history.replace(redirectPath);
    }
  }, [data, history, redirectPath]);

  // if (data && data.username) {
  //   return <Redirect to={redirectPath} />;
  // }
  return <Route {...rest} />;
}

export default RedirectRoute;
