import type { SxProps, Theme } from "@mui/material";

import { appTheme } from "../../../../AppProviders/theme.ts";

export const navigationListItemStyles: SxProps<Theme> = {
  "&.Mui-selected": {
    backgroundColor: appTheme.palette.primary.light,

    "&:hover": {
      backgroundColor: appTheme.palette.primary.main,
    },
  },
};
