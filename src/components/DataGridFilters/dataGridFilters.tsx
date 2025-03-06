import { Button, Grid } from "@mui/material";
import React from "react";

import { filterButtonsContainerStyles, filterFooterStyles } from "./styles";
import { generateFilterFields } from "./utils";

import type { FilterInputsConfig, ToggleButtonFilterProps } from "./types";

type DataGridFilterProps = {
  filterProps: FilterInputsConfig;
  filterToggles: ToggleButtonFilterProps;
};

export const DataGridFilters = React.memo<DataGridFilterProps>(function DataGridFilters({
  filterProps: { inputs, buttons },
  filterToggles,
}: DataGridFilterProps) {
  return (
    <Grid container direction="column">
      <Grid container gap={2}>
        {inputs.map((input) => (
          <Grid item key={input.id}>
            {generateFilterFields(input)}
          </Grid>
        ))}
      </Grid>

      <Grid container sx={filterFooterStyles}>
        <Grid item sx={filterButtonsContainerStyles}>
          {buttons.map(({ id, label, color, disabled, onClick, size, variant }) => (
            <Button
              key={id}
              color={color}
              disabled={disabled}
              id={id}
              onClick={onClick}
              size={size}
              variant={variant}
            >
              {label}
            </Button>
          ))}
        </Grid>

        <Grid item>{generateFilterFields(filterToggles)}</Grid>
      </Grid>
    </Grid>
  );
});
