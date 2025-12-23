import type { SxProps } from "@mui/material";

export const homePageContainerStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1200px",
};

export const welcomeTextContainerStyles: SxProps = {
  margin: "4rem 0",
  textAlign: "center",
};

export const sectionTitleStyles: SxProps = {
  marginBottom: "2rem",
  fontWeight: 800,
  textAlign: "center",
  background: "linear-gradient(90deg, #7C4DFF, #FFAB40)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const homePageCardStyles: SxProps = {
  flex: "1 1 300px",
  padding: "2rem",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "24px",
};

export const dividerStyles: SxProps = {
  margin: "1.5rem 0",
  borderColor: "rgba(255, 255, 255, 0.1)",
};

export const buttonsContainerStyles: SxProps = {
  display: "flex",
  margin: "2rem 0",
  gap: "1.5rem",
};
