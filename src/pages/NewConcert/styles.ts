import type { SxProps } from "@mui/material";

export const formContainerStyle: SxProps = {
  mt: "3rem",
  width: { xs: "90%", md: "60%" }, // Responsive width
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const paperStyle: SxProps = {
  width: "100%",
  borderRadius: "0.5rem",
  boxShadow: "0px .2rem .4rem rgba(0,0,0,0.1)",
  overflow: "hidden", // Ensures no content overflow
  padding: "1.5rem",
  backgroundColor: "#f7f7ff",
};
