import type { SxProps, Theme } from "@mui/material";

// why theme?
export const controlButtonsContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignSelf: "flex-end",
  marginTop: "1rem",
  flexWrap: "nowrap",
};
