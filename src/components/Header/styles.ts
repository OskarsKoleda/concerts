import type { SxProps } from "@mui/material";

import { appTheme } from "../AppProviders/theme.ts";

export const headerToolbarStyles: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const appTitleStyles: SxProps = {
  marginLeft: "1rem",
  color: appTheme.palette.primary.contrastText,
};
