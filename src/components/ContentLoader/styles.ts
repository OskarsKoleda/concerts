import type { SxProps } from "@mui/material";

export const contentWrapperSyle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
};

export const getContentStyles = (isLoading: boolean): SxProps => ({
  opacity: isLoading ? 0.5 : 1,
  visibility: isLoading ? "hidden" : "visible",
});
