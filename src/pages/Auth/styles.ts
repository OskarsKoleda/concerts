import type { SxProps } from "@mui/material";

export const bottomCaptionStyles: SxProps = {
  marginTop: "0.75rem",

  span: {
    textDecoration: "underline",
    fontFamily: "inherit",

    ":hover": {
      cursor: "pointer",
    },
  },
};
