import React from "react";
import LocalStore from "stores/LocalStore";
import UserStore from "stores/UserStore";

type RootStateContextValue = {
  userStore: UserStore;
  localStore: LocalStore;
};

const userStore = new UserStore();
const localStore = new LocalStore();

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ userStore, localStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
