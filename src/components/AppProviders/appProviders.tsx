import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SnackbarProvider } from "notistack";

import type { PropsWithChildren } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "../../store/StoreContext";

import { appTheme } from "./theme";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

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
