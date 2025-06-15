import type { SxProps } from "@mui/material";
import { appTheme } from "../AppProviders/theme.ts";

export const filterFooterStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

export const toggleButtonGroupStyles: SxProps = {
  ".Mui-selected": {
    "&:hover": {
      cursor: "default",
    },
  },
};

export const toggleButtonStyles: SxProps = {
  color: appTheme.palette.primary.contrastText,
  backgroundColor: appTheme.palette.primary.main,

  "&:hover": {
    backgroundColor: appTheme.palette.primary.light,
  },
};
