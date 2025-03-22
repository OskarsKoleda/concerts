import { Box, Grid } from "@mui/material";
import { memo } from "react";

import { LoadingButton } from "@mui/lab";
import { DeleteEventButton } from "../DeleteEventButton/DeleteEventButton.tsx";

import { controlButtonsContainerStyles } from "./styles";
import { toVisibleControl } from "./utils";

import type { ControlPayload } from "./types";

export type ButtonLayoutProps = {
  controls: ControlPayload[];
  showDelete: boolean;
};

export const ButtonsLayout = memo<ButtonLayoutProps>(function ButtonsLayout({
  controls,
  showDelete,
}: ButtonLayoutProps) {
  return (
    <Box>
      <Grid container sx={controlButtonsContainerStyles}>
        <Grid item display="flex">
          {controls.flatMap(toVisibleControl).map((control) => (
            <Grid item key={control.text} mr={1}>
              <LoadingButton id={control.id} {...control}>
                {control.text}
              </LoadingButton>
            </Grid>
          ))}
        </Grid>
        {showDelete && (
          <Grid item>
            <DeleteEventButton />
          </Grid>
        )}
      </Grid>
    </Box>
  );
});
