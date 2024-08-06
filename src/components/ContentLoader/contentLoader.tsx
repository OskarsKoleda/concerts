import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";

import { contentWrapperSyle } from "./styles";

import type { FC, PropsWithChildren } from "react";
import type { SxProps } from "@mui/material";

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
        <Box sx={contentWrapperSyle}>
          <CircularProgress thickness={6} size={120} />
        </Box>
      ) : (
        <Box sx={contentStyles}>{children}</Box>
      )}
    </Box>
  );
});
