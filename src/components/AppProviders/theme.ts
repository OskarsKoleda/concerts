import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5C6BC0",
      light: "#8E99F3",
      dark: "#3E4A89",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF7043",
      light: "#FFAB91",
      dark: "#D32F2F",
      contrastText: "#fff",
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
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#757575",
    },
    divider: "#FF7043",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto', 'Arial', sans-serif",
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
});

export const appTheme1 = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      light: "#757DE8",
      dark: "#002984",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF5722",
      light: "#FF8A50",
      dark: "#C41C00",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F44336",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9800",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F0F2F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
