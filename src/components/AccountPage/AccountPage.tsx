import { useRootStore } from "context/RootStateContext";
import { Observer } from "mobx-react";
import React from "react";

const AccountPage = (): JSX.Element => {
  const { userStore } = useRootStore();

  return (
    <Observer>
      {() => (
        <div>
          <h1>Account</h1>
          {<p>{userStore.username}</p>}
        </div>
      )}
    </Observer>
  );
};

export default AccountPage;
