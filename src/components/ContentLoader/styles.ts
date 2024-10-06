import type { SxProps } from "@mui/material";

export const contentWrapperSyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

export const getContentStyles = (isLoading: boolean): SxProps => ({
  opacity: isLoading ? 0.5 : 1,
  visibility: isLoading ? "hidden" : "visible",
});
