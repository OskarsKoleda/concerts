import { render } from "@testing-library/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";

import RootStore from "../../store/RootStore.ts";
import { StoreProvider } from "../../store/StoreContext.tsx";

import type { RenderOptions, RenderResult } from "@testing-library/react";
import type { FC, ReactNode } from "react";
import type { UseFormProps } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ExtendedRenderOptions<TFieldValues extends Record<string, any>>
  extends Omit<RenderOptions, "wrapper"> {
  rootStore?: RootStore | null;
  formConfig?: UseFormProps<TFieldValues> | null;
  route?: string;
  queryClient?: boolean;
}

export function renderWithProviders<TFieldValues extends Record<string, any> = any>(
  UI: React.ReactElement,
  {
    rootStore = new RootStore(),
    formConfig = null,
    route = "/",
    queryClient = false,
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
    const UIWithQueryClient = WithQueryClient(UIWithRouter);

    return UIWithQueryClient;
  };

  return {
    rootStore,
    ...render(UI, { wrapper: WithProvidersWrapper, ...renderOptions }),
  };
}

const WithRouter = (route: string, children: ReactNode) => {
  return (
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      initialEntries={[route]}
    >
      {children}
    </MemoryRouter>
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

const WithQueryClient = (children: ReactNode) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const queryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
