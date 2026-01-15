import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";

import { DATA_CACHE_TIME, DATA_STALE_TIME } from "../../common/constants/appConstant.ts";
import { StoreProvider } from "../../store/StoreContext.tsx";

import { appTheme } from "./theme.ts";

import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DATA_STALE_TIME,
      gcTime: DATA_CACHE_TIME,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default AppProviders;
