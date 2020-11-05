import { useRootStore } from "context/RootStateContext";
import { useObserver } from "mobx-react";
import React from "react";


const AccountPage = (): JSX.Element => {
  const { userStore } = useRootStore();

  return useObserver(() => (
    <div>
      <h1>Account</h1>
      {<p>{userStore.username}</p>}
    </div>
  ));
}

export default AccountPage;
