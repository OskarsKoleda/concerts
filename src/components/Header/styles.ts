import { appTheme } from "../AppProviders/theme.ts";

import type { SxProps } from "@mui/material";

export const headerToolbarStyles: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

// TODO: remove or something
export const headerSkeletonStyles: SxProps = {
  width: "16rem",
  height: "1.5rem",
  marginRight: "1.25rem",
  backgroundColor: appTheme.palette.primary.dark,
};
