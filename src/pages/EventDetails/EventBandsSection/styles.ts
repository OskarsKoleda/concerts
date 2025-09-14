import { appTheme } from "../../../components/AppProviders/theme";

import type { SxProps } from "@mui/material";

export const artistsContainerStyles: SxProps = {
  flex: "1 0 25%",
  marginLeft: "1rem",
  borderRadius: 0,
  boxShadow: "2px 2px 10px #52C7B8",
  backgroundColor: appTheme.palette.secondary.light,
  overflow: "auto",
};
