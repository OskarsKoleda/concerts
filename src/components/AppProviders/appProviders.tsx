import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { StoreProvider } from "../../store/StoreContext";

import { theme } from "./theme";

import type { PropsWithChildren } from "react";

// move to somewhere else

export const AppProviders: React.FC<PropsWithChildren> = function AppProviders({ children }) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
