import { Button } from "@material-ui/core";
import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { RootStoreContext } from "stores/RootStore";

const AccountPage = (): JSX.Element => {
  const { userStore } = useContext(RootStoreContext);
  const history = useHistory();

  const handleLogout = () => {
    userStore.logout();
    history.push("/login");
  };

  return (
    <Observer>
      {() => (
        <div>
          <h1>Account</h1>
          {<p>{JSON.stringify(userStore.userData)}</p>}
          <Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      )}
    </Observer>
  );
};

export default AccountPage;
