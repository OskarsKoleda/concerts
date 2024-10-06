import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#79B791",
      light: "#A2CDB3",
      dark: "#4F9268",
      contrastText: "#333",
    },
    secondary: {
      main: "#FFB86F",
      light: "#FFD1A9",
      dark: "#C88652",
      contrastText: "#333",
    },
    error: {
      main: "#A22C29",
    },
    // warning: {},
    info: {
      main: "#858AE3",
    },
    success: { main: "#5BD695" },
  },
  typography: {
    allVariants: {
      color: "#333",
    },
  },
});
