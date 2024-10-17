import { Button, Grid } from "@mui/material";
import React from "react";

import { filterButtonsContainerStyles } from "./styles";
import { generateFilterFields } from "./utils";

import type { FilterInputsConfig } from "./types";

export type DataGridFilterProps = {
  filterProps: FilterInputsConfig;
};

export const DataGridFilters = React.memo<DataGridFilterProps>(function DataGridFilters({
  filterProps: { inputs, buttons },
}) {
  return (
    <Grid container direction="column">
      <Grid container item direction="row" rowSpacing={2} columnSpacing={4}>
        {inputs.map((input) => (
          <Grid item key={input.id}>
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
