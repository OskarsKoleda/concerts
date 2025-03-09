import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#009688",
      light: "#52C7B8",
      dark: "#00796B",
      contrastText: "#e8f4e8",
    },
    secondary: {
      main: "#CDDC39",
      light: "#E6EE9C",
      dark: "#AFB42B",
      contrastText: "#51514b",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#FFEB3B",
    },
    info: {
      main: "#1976D2",
    },
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "#f0f4f7",
      paper: "#e7efb5",
    },
    text: {
      primary: "#333",
      secondary: "#757575",
    },
  },
  typography: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // fontFamily: "Nunito",
    fontFamily: "cursive",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontSize: "0.875rem",
      textTransform: "uppercase",
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#757575",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      color: "#757575",
    },
    caption: {
      fontSize: "0.75rem",
      color: "#757575",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      textTransform: "uppercase",
      color: "#333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
