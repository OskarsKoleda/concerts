import type { SxProps } from "@mui/material";

export const toggleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: "primary.contrastText",
  backgroundColor: "primary.main",
  margin: "0 0.25rem",
  border: "none",

  "&.Mui-selected": {
    color: "primary.contrastText",
    backgroundColor: "primary.dark !important",

    "&:hover": {
      backgroundColor: "primary.dark",
    },
  },

  "&:hover": {
    backgroundColor: "primary.light",
  },
};

export const filterFooterStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};
