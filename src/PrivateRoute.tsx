import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UseRootStore } from "context/RootStateContext";

function PrivateRoute({ component: Component, ...rest }) {
  const {userStore} = UseRootStore();

  return (
    <Route
      {...rest}
      render={(props) =>
        userStore.loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
