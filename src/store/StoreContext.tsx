import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";

import RootStore from "./RootStore";

interface StoreProviderProps {
  mockedStore?: RootStore;
  children: ReactNode;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ mockedStore, children }) => {
  const store = mockedStore || new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return store;
};
