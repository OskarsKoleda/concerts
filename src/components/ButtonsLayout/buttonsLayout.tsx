import { memo } from "react";
import { Box, Button, Grid } from "@mui/material";

import { controlButtonsContainerStyles } from "./styles";
import { toVisibleControl } from "./utils";

import type { ButtonLayoutProps } from "./types";

export const ButtonsLayout = memo<ButtonLayoutProps>(function ConcertCreationFormControls({
  controls,
}) {
  return (
    <Box>
      <Grid container columnSpacing={1} sx={controlButtonsContainerStyles}>
        {controls.flatMap(toVisibleControl).map((control) => (
          <Grid key={control.text} item>
            <Button id={control.id} {...control}>
              {control.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
