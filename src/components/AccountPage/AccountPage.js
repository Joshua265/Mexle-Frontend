import React from "react";
import { useUserStore } from "context/UserContext";

function AccountPage() {
  const userStore = useUserStore();

  return (
    <div>
      <h1>Account</h1>
      <p>{userStore.username}</p>
    </div>
  );
}

export default AccountPage;
