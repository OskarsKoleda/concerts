import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { Children, memo } from "react";

import { toVisibleControl } from "./utils.ts";

import type { PropsWithChildren } from "react";
import type { ControlPayload } from "../../common/types/appTypes.ts";

type ButtonLayoutProps = {
  controls: ControlPayload[];
} & PropsWithChildren;

const ButtonsLayout = ({ controls, children }: ButtonLayoutProps) => {
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

        {Children.toArray(children).map((child, index) => (
          <Grid item mr={1} key={index}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default memo(ButtonsLayout);
