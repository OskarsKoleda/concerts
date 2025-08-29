import { appTheme } from "./components/AppProviders/theme.ts";

import type { SxProps, Theme } from "@mui/material";

export const appContainerStyles: SxProps = {
  height: "100vh",
  width: "100vw",
};

export const contentWrapperStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

export const scrollContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  overflowX: "hidden",
  backgroundColor: appTheme.palette.background.default,
};
