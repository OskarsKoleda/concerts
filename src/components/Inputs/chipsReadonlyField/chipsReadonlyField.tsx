import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";

interface ReadonlyFieldProps {
  label: ReactNode;
  sx?: SxProps;
  values?: string[];
}

export const ChipsReadonlyField: React.FC<ReadonlyFieldProps> = ({ label, sx, values }) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.375rem" sx={sx}>
      <Typography variant="body2">{label}</Typography>

      {values && values.length ? (
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
