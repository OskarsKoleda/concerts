import React from "react";
import { FilterInputsConfig } from "./types";
import { Button, Grid } from "@mui/material";
import { generateFilterFields } from "./utils";

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
          <Grid item xs={4} key={input.id}>
            {generateFilterFields(input)}
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item>
          {buttons.map((button) => (
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
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});
