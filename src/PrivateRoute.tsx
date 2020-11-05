import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

function PrivateRoute({ component: Component, ...rest }) {
  const {userStore} = useRootStore();
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(props) =>
        userStore.loggedIn ? <Component {...props} /> : <Redirect to={`/login?path=${location.pathname}`} />
      }
    />
  );
}

export default PrivateRoute;
