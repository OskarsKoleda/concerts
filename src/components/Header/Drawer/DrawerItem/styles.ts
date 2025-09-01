import { appTheme } from "../../../AppProviders/theme";

import type { SxProps, Theme } from "@mui/material";

export const drawerItemStyles: SxProps<Theme> = {
  "&.Mui-selected": {
    backgroundColor: appTheme.palette.primary.light,

    "&:hover": {
      backgroundColor: appTheme.palette.primary.main,
    },
  },
};
