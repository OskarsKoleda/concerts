import type { SxProps } from "@mui/material";

export const eventNotFoundStyles: SxProps = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
};

export const eventContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  padding: "1.5rem",
  gap: "3rem",
};

export const eventTitleStyles: SxProps = {
  fontSize: "2rem",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #7C4DFF, #FFAB40)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const eventDetailsStyles: SxProps = {
  display: "flex",
  alignItems: "start",
  width: "100%",
  gap: "2rem",
};
