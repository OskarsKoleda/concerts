import { appTheme } from "../../components/AppProviders/theme.ts";

import type { SxProps } from "@mui/material";

export const homePageContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "70%",
};

export const welcomeTextContainerStyles: SxProps = {
  margin: "1.5rem",
  padding: "1rem",
};

export const dividerStyles: SxProps = {
  margin: "1rem 0",
};

export const informationContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
};

export const homePageCardStyles: SxProps = {
  flex: 0,
  minWidth: "20rem",
  margin: "0 1rem",
  padding: "1rem",
  backgroundColor: appTheme.palette.primary.light,
};

export const buttonsContainerStyles: SxProps = {
  display: "flex",
  margin: "2rem",
  gap: "1.5rem",
};
