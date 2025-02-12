import type { FallbackProps } from "react-error-boundary";
import { Paper, Typography } from "@mui/material";
import React from "react";

export const ErrorBoundaryMessage = React.memo<Partial<FallbackProps>>(
  function ErrorBoundaryMessage() {
    return (
      <Paper>
        <Typography variant="body2">Something very wrong happened!</Typography>
      </Paper>
    );
  },
);
