import React from "react";
import { Button, Grid } from "@mui/material";

import { generateFilterFields } from "./utils";
import { filterButtonsContainerStyles } from "./styles";

import type { FilterInputsConfig } from "./types";

export interface DataGridFilterProps {
  filterProps: FilterInputsConfig;
}

export const DataGridFilters = React.memo<DataGridFilterProps>(function DataGridFilters({
  filterProps: { inputs, buttons },
}) {
  return (
    <Grid container>
      <Grid container item>
        {inputs.map((input) => (
          <Grid item xl={2} key={input.id}>
            {generateFilterFields(input)}
          </Grid>
        ))}
      </Grid>
      <Grid container sx={filterButtonsContainerStyles}>
        {buttons.map((button) => (
          <Grid sx={{ mr: "1rem" }} key={button.id} item>
            <Button
              key={button.id}
              color={button.color}
              disabled={button.disabled}
              id={button.id}
              onClick={button.onClick}
              size={button.size}
              variant={button.variant}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});
