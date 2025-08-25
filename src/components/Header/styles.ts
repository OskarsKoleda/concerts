import { appTheme } from "../AppProviders/theme.ts";

import type { SxProps } from "@mui/material";

export const headerToolbarStyles: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const appTitleStyles: SxProps = {
  marginLeft: "1rem",
  color: appTheme.palette.primary.contrastText,
};

export const headerSkeletonStyles: SxProps = {
  width: "16rem",
  height: "1.5rem",
  marginRight: "1.25rem",
  backgroundColor: appTheme.palette.primary.dark,
};
