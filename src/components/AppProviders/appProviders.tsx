import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import React from "react";

import { StoreProvider } from "../../store/StoreContext.tsx";
import { DATA_CACHE_TIME, DATA_STALE_TIME } from "../../common/constants/appConstant.ts";

import { appTheme } from "./theme.ts";

// TODO: review usage of tanstack
export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DATA_STALE_TIME,
        gcTime: DATA_CACHE_TIME,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <StoreProvider>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
