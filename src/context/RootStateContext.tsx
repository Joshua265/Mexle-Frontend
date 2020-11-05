import React from 'react';
import UserStore from 'stores/UserStore';

type RootStateContextValue = {
  userStore: UserStore
}

const userStore = new UserStore();

const RootStateContext  = React.createContext<RootStateContextValue>({} as RootStateContextValue);

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
  <RootStateContext.Provider value={{userStore}}>
    {children}
  </RootStateContext.Provider>
);
};

export const UseRootStore = () => React.useContext(RootStateContext);