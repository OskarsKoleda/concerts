import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";
import type { PropsWithChildren } from "react";

import { contentLoaderWrapperStyles } from "./styles";

type ContentLoaderProps = {
  isLoading: boolean;
} & PropsWithChildren;

const ContentLoader = ({ isLoading, children }: ContentLoaderProps) => {
  return (
    <>
      {isLoading ? (
        <Box sx={contentLoaderWrapperStyles}>
          <CircularProgress thickness={5} size={90} />
        </Box>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
};

export default memo(ContentLoader);
