import { Button, Grid } from "@mui/material";

import { memo } from "react";
import { filterFooterStyles } from "./styles";
import { generateFilterFields } from "./utils";

import type { FilterInputsConfig, ToggleButtonFilterProps } from "./types";

type DataGridFiltersProps = {
  filterProps: FilterInputsConfig;
  filterToggles: ToggleButtonFilterProps;
};

export const DataGridFilters = ({
  filterProps: { inputs, buttons },
  filterToggles,
}: DataGridFiltersProps) => {
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
        <Grid item display="flex" gap={2}>
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
};

export default memo(DataGridFilters);
