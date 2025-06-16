import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { FC, ReactNode } from "react";
import React from "react";
import type { UseFormProps } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RootStore from "../../store/RootStore.ts";
import { StoreProvider } from "../../store/StoreContext.tsx";

interface ExtendedRenderOptions<TFieldValues extends Record<string, any>>
  extends Omit<RenderOptions, "wrapper"> {
  rootStore?: RootStore | null;
  formConfig?: UseFormProps<TFieldValues> | null;
}

const WithRouter = (children: ReactNode) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </BrowserRouter>
  );
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

    const UIWithRouter = WithRouter(UIWithFormProvider);

    return UIWithRouter;
  };

  return {
    rootStore,
    ...render(UI, { wrapper: WithProvidersWrapper, ...renderOptions }),
  };
}
