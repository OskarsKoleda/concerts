import type { SxProps } from "@mui/material";

export const dataGridWrapperStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5rem",

  ".cell div": {
    boxSizing: "border-box",
  },
};

export const tableStyles: SxProps = {
  boxShadow: 2,
};
