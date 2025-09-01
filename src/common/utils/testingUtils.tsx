import { render } from "@testing-library/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";

import RootStore from "../../store/RootStore.ts";
import { StoreProvider } from "../../store/StoreContext.tsx";

import type { RenderOptions, RenderResult } from "@testing-library/react";
import type { FC, ReactNode } from "react";
import type { UseFormProps } from "react-hook-form";

interface ExtendedRenderOptions<TFieldValues extends Record<string, any>>
  extends Omit<RenderOptions, "wrapper"> {
  rootStore?: RootStore | null;
  formConfig?: UseFormProps<TFieldValues> | null;
  route?: string;
}

const WithRouter = (route: string, children: ReactNode) => {
  return <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;
};

const WithStore = (store: RootStore, children: ReactNode) => {
  return <StoreProvider mockedStore={store}>{children}</StoreProvider>;
};

const WithFormProvider = <TFieldValues extends Record<string, any>>(
  children: ReactNode,
  formConfig: UseFormProps<TFieldValues>,
) => {
  const formMethods = useForm<TFieldValues>(formConfig);

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export function renderWithProviders<TFieldValues extends Record<string, any> = any>(
  UI: React.ReactElement,
  {
    rootStore = new RootStore(),
    formConfig = null,
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions<TFieldValues> = {},
): RenderResult & { rootStore: RootStore | null } {
  const WithProvidersWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const UIWithStore = rootStore ? WithStore(rootStore, children) : <>{children}</>;
    const UIWithFormProvider = formConfig ? (
      WithFormProvider(UIWithStore, formConfig)
    ) : (
      <>{UIWithStore}</>
    );

    const UIWithRouter = WithRouter(route, UIWithFormProvider);

    return UIWithRouter;
  };

  return {
    rootStore,
    ...render(UI, { wrapper: WithProvidersWrapper, ...renderOptions }),
  };
}
