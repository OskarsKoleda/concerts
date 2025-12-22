import type { SxProps } from "@mui/system";

export const leftContentStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  color: "primary.contrastText",
  textDecoration: "none",

  "&:hover": {
    color: "text.secondary",
  },
};
