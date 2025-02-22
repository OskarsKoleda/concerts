import type { SxProps, Theme } from "@mui/material";

export const appContainerStyles: SxProps<Theme> = {
  height: "100vh",
  width: "100vw",
};

export const contentWrapperStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

export const scrollContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: "1",
  // overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: "#756a6a",
};
