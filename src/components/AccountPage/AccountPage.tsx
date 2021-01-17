import { Button } from "@material-ui/core";
import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RootStoreContext } from "stores/RootStore";

import AccountInformation from "components/AccountPage/AccountInformation";
import AccountOptions from "./AccountOptions";
import Timeline from "./Timeline";

const AccountPage = (): JSX.Element => {
  const { userStore } = useContext(RootStoreContext);

  return (
    <Observer>
      {() => (
        <>
          <AccountInformation />
          <Timeline />
        </>
      )}
    </Observer>
  );
};

export default AccountPage;
