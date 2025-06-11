import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { FC } from "react";
import React from "react";
import RootStore from "../../store/RootStore.ts";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string | null;
  location?: string | null;
  rootStore?: RootStore | null;
}

const withRouter = (children: React.ReactNode, route: string): JSX.Element => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path={route} element={children} />
      </Routes>
    </BrowserRouter>
  );
};

export function renderWithProviders(
  UI: React.ReactElement,
  {
    route = "concerts/testing-route",
    location = route,
    rootStore = new RootStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {},
): RenderResult & { rootStore: RootStore | null } {
  if (location) {
    window.history.pushState({}, "", route);
  }

  const WithProvidersWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    const UIWithRouter = route ? withRouter(children, route) : <>{children}</>;

    return UIWithRouter;
  };

  return {
    rootStore,
    ...render(UI, { wrapper: WithProvidersWrapper, ...renderOptions }),
  };
}
