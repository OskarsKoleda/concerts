import type { SxProps } from "@mui/material";

export const listItemStyle: SxProps = {
  "&.Mui-selected": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    },
  },
};
