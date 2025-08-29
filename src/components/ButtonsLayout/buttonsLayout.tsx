import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { memo } from "react";

import DeleteEventButton from "../DeleteEventButton/DeleteEventButton.tsx";

import { toVisibleControl } from "./utils.ts";

import type { ControlPayload } from "./types.ts";

interface ButtonLayoutProps {
  controls: ControlPayload[];
  renderDeleteButton: boolean;
}

const ButtonsLayout = ({ controls, renderDeleteButton }: ButtonLayoutProps) => {
  return (
    <Grid container mt="1rem">
      <Grid item display="flex">
        {controls
          .map(toVisibleControl)
          .filter((control) => !!control)
          .map((control) => (
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
