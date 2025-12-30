import type { SxProps } from "@mui/material";

export const headerToolbarStyles: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

export const headerContentStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  gap: "0.5rem",
};

export const navLinkStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "primary.contrastText",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    color: "secondary.light",
    filter: "drop-shadow(0 0 8px rgba(255, 171, 64, 0.3))",
  },
};
