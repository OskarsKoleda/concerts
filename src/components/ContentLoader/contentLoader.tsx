import { Box, CircularProgress } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";

import { contentWrapperSyle, getContentStyles } from "./styles";

type ContentLoaderProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const ContentLoader: FC<ContentLoaderProps> = memo(function ContentLoader({
  isLoading,
  children,
}) {
  const contentStyles = getContentStyles(isLoading);

  return (
    <Box>
      {isLoading ? (
        <Box sx={contentWrapperSyle}>
          <CircularProgress thickness={6} size={90} />
        </Box>
      ) : (
        <Box sx={contentStyles}>{children}</Box>
      )}
    </Box>
  );
});
