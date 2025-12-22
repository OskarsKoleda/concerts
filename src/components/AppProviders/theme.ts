import { alpha, createTheme } from "@mui/material";

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
      main: "#FFAB40", // Warm Amber
      light: "#FFD180",
      dark: "#FF9100",
      contrastText: "#000000",
    },
    error: {
      main: "#FF5252",
    },
    background: {
      default: "#0A0A0B", // Deep Black/Near Black
      paper: "#161618", // Slightly lighter for cards
    },
    text: {
      primary: "#F5F5F7",
      secondary: "#A1A1A6",
    },
    divider: "rgba(255, 255, 255, 0.08)",
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
      textTransform: "none", // Modern look: no ALL CAPS
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Use a function that receives { theme }
        root: ({ theme }) => ({
          borderRadius: "0.5rem",
          padding: "0.5rem 1.25rem",
          boxShadow: "none",
          "&:hover": {
            // Refer to primary main and use alpha for transparency!
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }),
        containedPrimary: ({ theme }) => ({
          // Refer to primary main and light directly!
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          "&:hover": {
            // You can even flip the gradient or darken it on hover
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "1rem",
          // Refer to the divider or a custom opacity of the text
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});
