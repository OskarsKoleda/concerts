import type { SxProps } from "@mui/material";
import { appTheme } from "../../../components/AppProviders/theme.ts";

export const formContainerStyles: SxProps = {
  marginTop: "3rem",
  maxWidth: "40rem",

  [appTheme.breakpoints.up("lg")]: {
    maxWidth: "50rem",
  },
};

export const posterTitleStyles = (readonly: boolean): SxProps => ({
  marginTop: "1rem",
  marginBottom: readonly ? 0 : "0.25rem",
  fontSize: "0.875rem",
  fontWeight: 500,
});
