import { Paper, Typography } from "@mui/material";
import { memo } from "react";

import type { FallbackProps } from "react-error-boundary";

export const ErrorBoundaryMessage = () => {
  return (
    <Paper>
      <Typography variant="body2">Something very wrong happened! Refresh the page.</Typography>
    </Paper>
  );
};

export default memo<Partial<FallbackProps>>(ErrorBoundaryMessage);
