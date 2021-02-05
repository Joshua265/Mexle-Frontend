import React from "react";

import AccountInformation from "components/AccountPage/AccountInformation";
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
