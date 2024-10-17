import { Box, Button, Grid } from "@mui/material";
import { memo } from "react";

import { DeleteConcertButton } from "../DeleteConcertButton/DeleteConcertButton";

import { controlButtonsContainerStyles } from "./styles";
import { toVisibleControl } from "./utils";

import type { ControlPayload } from "./types";

export type ButtonLayoutProps = {
  controls: ControlPayload[];
};

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
      <DeleteConcertButton />
    </Box>
  );
});
