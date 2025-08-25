import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { memo } from "react";

import DeleteEventButton from "../DeleteEventButton/DeleteEventButton.tsx";

import { buttonsLayoutStyles } from "./styles.ts";
import { toVisibleControl } from "./utils.ts";

import type { ControlPayload } from "./types.ts";

interface ButtonLayoutProps {
  controls: ControlPayload[];
  renderDeleteButton: boolean;
}

// TODO: re-work toVisibleControl
// TODO: what is LoadingButton?
const ButtonsLayout = ({ controls, renderDeleteButton }: ButtonLayoutProps) => {
  return (
    <Grid container sx={buttonsLayoutStyles}>
      <Grid item display="flex">
        {controls.flatMap(toVisibleControl).map((control) => (
          <Grid item key={control.text} mr={1}>
            <LoadingButton id={control.id} {...control}>
              {control.text}
            </LoadingButton>
          </Grid>
        ))}
      </Grid>

      {renderDeleteButton && (
        <Grid item>
          <DeleteEventButton />
        </Grid>
      )}
    </Grid>
  );
};

export default memo(ButtonsLayout);
