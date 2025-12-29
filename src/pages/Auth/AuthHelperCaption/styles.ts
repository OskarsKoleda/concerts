import type { SxProps } from "@mui/material";

export const authHelperCaption: SxProps = {
  marginTop: "0.75rem",

  span: {
    textDecoration: "underline",
    fontFamily: "inherit",

    "&:hover": {
      cursor: "pointer",
      color: "text.primary",
    },
  },
};
