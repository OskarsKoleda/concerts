import { Box, SxProps, CircularProgress } from "@mui/material";
import { memo, FC, PropsWithChildren } from "react";
import { contentWrapperSyle } from "./styles";

type ContentLoaderProps = PropsWithChildren<{
  isLoading: boolean;
}>;

const wrapperStyles: SxProps = { width: "100%" };

const getContentStyles = (isLoading: boolean): SxProps => ({
  opacity: isLoading ? 0.5 : 1,
  visibility: isLoading ? "hidden" : "visible",
});

export const ContentLoader: FC<ContentLoaderProps> = memo(function ContentLoader({
  isLoading,
  children,
}) {
  const contentStyles = getContentStyles(isLoading);
  return (
    <Box sx={wrapperStyles}>
      {isLoading ? (
        <Box
          sx={contentWrapperSyle}
        >
          <CircularProgress thickness={6} size={120}/>
        </Box>
      ) : (
        <Box sx={contentStyles}>{children}</Box>
      )}
    </Box>
  );
});
