import React, { createContext, useContext, useMemo } from "react";

import RootStore from "./RootStore";

import type { ReactNode } from "react";

interface StoreProviderProps {
  mockedStore?: RootStore;
  children: ReactNode;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ mockedStore, children }) => {
  const store = useMemo(() => {
    return mockedStore ?? new RootStore();
  }, [mockedStore]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("useRootStore must be used within a StoreProvider");
  }

  return store;
};
