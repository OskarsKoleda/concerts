import type { SxProps } from "@mui/material";

export const formContainerStyles: SxProps = {
  display: "flex",
};

export const paperStyles: SxProps = {
  borderRadius: "0.2rem",
  boxShadow: "0px .2rem .4rem rgba(0,0,0,0.1)",
  padding: "1.5rem",
};

export const posterTitleStyles = (readonly: boolean): SxProps => ({
  marginTop: "1rem",
  marginBottom: readonly ? 0 : "0.25rem",
  fontSize: "0.875rem",
  fontWeight: 500,
});
