import { Button } from "@material-ui/core";
import { useRootStore } from "context/RootStateContext";
import { Observer } from "mobx-react";
import React from "react";
import { useHistory } from "react-router-dom";

const AccountPage = (): JSX.Element => {
  const { userStore } = useRootStore();
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
