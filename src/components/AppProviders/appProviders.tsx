import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SnackbarProvider } from "notistack";

import { StoreProvider } from "../../store/StoreContext";

import { appTheme } from "./theme";

import type { PropsWithChildren } from "react";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
