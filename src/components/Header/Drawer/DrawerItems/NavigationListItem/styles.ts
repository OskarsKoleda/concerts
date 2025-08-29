import { appTheme } from "../../../../AppProviders/theme.ts";

import type { SxProps, Theme } from "@mui/material";

export const navigationListItemStyles: SxProps<Theme> = {
  "&.Mui-selected": {
    backgroundColor: appTheme.palette.primary.light,

    "&:hover": {
      backgroundColor: appTheme.palette.primary.main,
    },
  },
};
