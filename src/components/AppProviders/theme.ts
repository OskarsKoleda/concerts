import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7C4DFF",
      light: "#B47CFF",
      dark: "#3F1DCB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFAB40",
      light: "#FFD180",
      dark: "#FF9100",
      contrastText: "#000000",
    },
    error: {
      main: "#FF5252",
    },
    divider: "rgba(255, 255, 255, 0.34)",
    background: {
      default: "#0d0d0eff",
      paper: "#1d1d1dff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    button: {
      fontSize: "0.875rem",
      textTransform: "none",
      fontWeight: 600,
    },
  },
});
