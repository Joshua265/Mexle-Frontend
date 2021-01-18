import { Button } from "@material-ui/core";
import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RootStoreContext } from "stores/RootStore";

import AccountInformation from "components/AccountPage/AccountInformation";
import AccountOptions from "./AccountOptions";
import Timeline from "./Timeline";

const AccountPage = (): JSX.Element => {
  return (
    <>
      <AccountInformation />
      <Timeline />
    </>
  );
};

export default AccountPage;
