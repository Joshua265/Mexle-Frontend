import React from "react";
import LocalStore from "stores/LocalStore";
import UserStore from "stores/UserStore";
import StepStore from "stores/StepStore";
import NavigationStore from "stores/NavigationStore";

type RootStateContextValue = {
  userStore: UserStore;
  localStore: LocalStore;
  stepStore: StepStore;
  navigationStore: NavigationStore;
};

const userStore = new UserStore();
const localStore = new LocalStore();
const stepStore = new StepStore();
const navigationStore = new NavigationStore();

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider
      value={{ userStore, localStore, stepStore, navigationStore }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
