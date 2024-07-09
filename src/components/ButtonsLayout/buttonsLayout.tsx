import { memo } from "react";
import { ButtonLayoutProps } from "./types";
import { controlButtonsContainerStyles } from "./styles";
import { Box, Button, Grid } from "@mui/material";

export const ButtonsLayout = memo<ButtonLayoutProps>(function ConcertCreationFormControls({
  controls,
}) {
  return (
    <Box>
      <Grid container columnSpacing={1} sx={controlButtonsContainerStyles}>
        {controls.map((control) => (
          <Grid key={control.id} item>
            <Button {...control}>{control.text}</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
