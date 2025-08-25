import { Box, CircularProgress } from "@mui/material";
import type { PropsWithChildren } from "react";
import { memo } from "react";

import { contentLoaderStyles } from "./styles";

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
