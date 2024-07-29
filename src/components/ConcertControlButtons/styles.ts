import type { SxProps } from "@mui/material";

export const buttonContainerStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  padding: "1px",
  // alignItems: "center",
  width: "100%",
  flexWrap: "nowrap", // Prevent icons from wrapping
  overflow: "hidden",
  "& > *": {
    flexShrink: 1, // Allow icons to shrink
  },
};
