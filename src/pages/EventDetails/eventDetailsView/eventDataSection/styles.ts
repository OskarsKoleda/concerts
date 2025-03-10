import type { SxProps } from "@mui/material";
import { appTheme } from "../../../../components/AppProviders/theme.ts";

export const eventDataContainerStyles: SxProps = {
  display: "flex",
  flex: "1 0 25%",
  flexDirection: "column",
  alignItems: "center",
  padding: "0.5rem",
  marginRight: "1rem",
  borderRadius: 0,
  // background: "radial-gradient(circle, rgba(89,89,89,1) 0%, rgba(123,123,123,1) 100%)",
  boxShadow: "2px 2px 10px #52C7B8",
  backgroundColor: appTheme.palette.secondary.light,
};

export const eventDataStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: " 3 0 auto",
};

export const eventDataFooterStyles: SxProps = {
  display: "flex",
  flex: "1 0 auto",
  alignItems: "center",
};

export const eventButtonContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};
