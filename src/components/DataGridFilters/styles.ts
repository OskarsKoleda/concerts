import type { SxProps } from "@mui/material";
import { appTheme } from "../AppProviders/theme.ts";

export const filterButtonsContainerStyles: SxProps = {
  display: "flex",
  gap: "1rem",
};

export const filterFooterStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

export const toggleButtonGroupStyles: SxProps = {
  ".Mui-selected": {
    color: appTheme.palette.primary.contrastText,
    backgroundColor: appTheme.palette.primary.dark,
  },
};

export const toggleButtonStyles: SxProps = {
  color: appTheme.palette.primary.contrastText,
  backgroundColor: appTheme.palette.primary.main,

  "&:hover": {
    color: appTheme.palette.primary.contrastText,
    backgroundColor: appTheme.palette.primary.dark,
  },
};
