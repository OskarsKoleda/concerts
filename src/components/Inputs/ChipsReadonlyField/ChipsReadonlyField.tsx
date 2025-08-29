import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import type { ReactNode } from "react";

interface ReadonlyFieldProps {
  label: ReactNode;
  values?: string[];
}

// TODO: not used now
export const ChipsReadonlyField: React.FC<ReadonlyFieldProps> = ({ label, values }) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.375rem">
      <Typography variant="body2">{label}</Typography>

      {values?.length ? (
        <Grid container direction="row" spacing={1}>
          {values.map((text) => (
            <Grid key={text} item>
              <Chip
                label={text}
                variant="filled"
                size="medium"
                color="secondary"
                sx={{ fontWeight: 500 }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">-</Typography>
      )}
    </Box>
  );
};
