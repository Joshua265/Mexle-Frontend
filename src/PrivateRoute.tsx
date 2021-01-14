import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RootStoreContext } from "stores/RootStore";

function PrivateRoute({ component: Component, ...rest }) {
  const { userStore } = useContext(RootStoreContext);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(props) =>
        userStore.userData.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?path=${location.pathname}`} />
        )
      }
    />
  );
}

export default PrivateRoute;
