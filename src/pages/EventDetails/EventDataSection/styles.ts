import type { SxProps } from "@mui/material";

// TODO: colors not from theme
export const eventDataContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
};

export const eventDataStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
};

export const eventDataFooterStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  padding: "1.5rem 0",
};

export const eventButtonContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
};
