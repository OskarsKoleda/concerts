import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";

import { contentLoaderStyles } from "./styles";

import type { PropsWithChildren } from "react";

type ContentLoaderProps = {
  isLoading: boolean;
} & PropsWithChildren;

const ContentLoader = ({ isLoading, children }: ContentLoaderProps) => {
  return (
    <>
      {isLoading ? (
        <Box sx={contentLoaderStyles}>
          <CircularProgress thickness={5} size={90} />
        </Box>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
};

export default memo(ContentLoader);
