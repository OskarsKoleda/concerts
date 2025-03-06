import type { SxProps, Theme } from "@mui/material";
import { appTheme } from "../AppProviders/theme.ts";

export const appContainerStyles: SxProps<Theme> = {
  height: "100vh",
  width: "100vw",
};

export const contentWrapperStyles: SxProps<Theme> = {
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
