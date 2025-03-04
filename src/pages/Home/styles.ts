import type { SxProps } from "@mui/material";
import { appTheme } from "../../components/AppProviders/theme.ts";

export const homePageContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const welcomeTextContainerStyles: SxProps = {
  display: "flex",
  margin: "1.5rem",
  padding: "1rem",
};

export const dividerStyles: SxProps = {
  margin: "1rem 0",
};

export const informationContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "40%",
};

export const additionalInfoStyles: SxProps = {
  flex: "0 0 49%",
  padding: "1rem",
  backgroundColor: appTheme.palette.primary.light,
};

export const statisticsStyles: SxProps = {
  flex: "0 0 49%",
  backgroundColor: appTheme.palette.primary.light,
};

export const buttonsContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "20%",
  margin: "2rem 0",
};
