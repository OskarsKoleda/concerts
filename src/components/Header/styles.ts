import type { SxProps } from "@mui/material";
import { appTheme } from "../AppProviders/theme.ts";

export const toolbarContainerStyle: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const flexCenterStyle: SxProps = {
  display: "flex",
  alignItems: "center",
};

export const homepageLinkStyles: SxProps = {
  display: "flex",
  alignItems: "center",
};

export const headerTitleStyles: SxProps = {
  marginLeft: "0.5rem",
  color: appTheme.palette.primary.contrastText,
};
