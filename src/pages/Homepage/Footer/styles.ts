import type { SxProps } from "@mui/material";

export const footerContainerStyles: SxProps = {
  display: "grid",
  width: "100%",
  padding: "4rem 2rem",
  borderTop: "1px solid",
  borderColor: "divider",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "3rem",
};

export const fakeLinkStyles: SxProps = {
  cursor: "pointer",
  color: "text.secondary",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  width: "fit-content",
  transform: "translateZ(0)", // Force GPU layer to prevent sub-pixel "jumps"

  "&:hover": {
    color: "primary.light",
    transform: "translateX(4px)",
  },
};
