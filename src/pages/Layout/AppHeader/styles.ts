import type { SxProps } from "@mui/system";

export const leftContentStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  color: "primary.contrastText",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    color: "secondary.light",
    filter: "drop-shadow(0 0 8px rgba(255, 171, 64, 0.3))",
  },
};
