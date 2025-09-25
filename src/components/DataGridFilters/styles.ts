import { appTheme } from "../AppProviders/theme.ts";

import type { SxProps } from "@mui/material";

// export const toggleButtonGroupStyles: SxProps = {
//   ".Mui-selected": {
//     "&:hover": {
//       cursor: "default",
//     },
//   },
// };

export const toggleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: appTheme.palette.primary.contrastText,
  backgroundColor: appTheme.palette.primary.main,

  "&:hover": {
    backgroundColor: appTheme.palette.primary.light,
  },
};

export const filterFooterStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};
