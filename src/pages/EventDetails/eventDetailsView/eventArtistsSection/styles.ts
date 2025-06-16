import type { SxProps } from "@mui/material";

import { appTheme } from "../../../../components/AppProviders/theme.ts";

export const artistsContainerStyles: SxProps = {
  flex: "1 0 25%",
  marginLeft: "1rem",
  borderRadius: 0,
  boxShadow: "2px 2px 10px #52C7B8",
  // background: "radial-gradient(circle, rgba(89,89,89,1) 0%, rgba(123,123,123,1) 100%)",
  backgroundColor: appTheme.palette.secondary.light,

  overflow: "auto",
};
