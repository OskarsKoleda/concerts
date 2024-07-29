import type { SxProps } from "@mui/material";

export const formContainerStyle: SxProps = {
  mt: "50px",
  width: { xs: "90%", md: "50%" }, // Responsive width
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const paperStyle: SxProps = {
  width: "100%",
  borderRadius: "10px",
  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
  overflow: "hidden", // Ensures no content overflow
};

export const formStyle: SxProps = {
  p: 3,
  backgroundColor: "#f7f7ff",
};
