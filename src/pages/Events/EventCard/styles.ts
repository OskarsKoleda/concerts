import type { SxProps } from "@mui/material";

export const footerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export const chipStyles: SxProps = {
  fontSize: "0.75rem",
  margin: "2px",
  fontWeight: "600",
  background: "rgba(124, 77, 255, 0.1)",
  color: "primary.light",
};

export const venueStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const venueIconStyles: SxProps = {
  color: "primary.main",
};

export const eventAuthorStyles: SxProps = {
  fontStyle: "italic",
  opacity: 0.7,
  fontSize: "0.75rem",
};

export const headerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
};
