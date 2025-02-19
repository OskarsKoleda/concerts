import type { SxProps } from "@mui/material";

export const formContainerStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "3rem",
  width: { xs: "90%", md: "60%" },
};

export const paperStyles: SxProps = {
  borderRadius: "0.5rem",
  boxShadow: "0px .2rem .4rem rgba(0,0,0,0.1)",
  padding: "1.5rem",
  backgroundColor: "#fef7ff",
};

export const posterTitleStyles = (readonly: boolean): SxProps => ({
  marginTop: "1rem",
  marginBottom: readonly ? 0 : "0.25rem",
  fontSize: "0.875rem",
  fontWeight: 500,
});
