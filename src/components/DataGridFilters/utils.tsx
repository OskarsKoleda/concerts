import { MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FilterInputType } from "./constants";

import type { FilterInputsConfigItem } from "./types";
import { toggleButtonGroupStyles, toggleButtonStyles } from "./styles.ts";

export function generateFilterFields(input: FilterInputsConfigItem): JSX.Element {
  switch (input.inputType) {
    case FilterInputType.text: {
      return (
        <TextField
          id={input.id}
          label={input.label}
          onChange={input.onChange}
          placeholder={input.placeholder}
          value={input.value}
          sx={{ backgroundColor: "#FFF" }}
          variant="outlined"
          size="small"
        />
      );
    }
    case FilterInputType.select: {
      return (
        <Select
          id={input.id}
          label={input.label}
          // onChange={input.onChange}
          placeholder={input.placeholder}
          value={input.value}
        >
          {input.options.map((opt: string) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      );
    }
    case FilterInputType.toggleButton: {
      return (
        <ToggleButtonGroup
          id={input.id}
          onChange={input.onChange}
          value={input.value}
          size="small"
          exclusive
          sx={toggleButtonGroupStyles}
        >
          {input.options.map((value: string) => (
            <ToggleButton key={value} value={value} sx={toggleButtonStyles}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      );
    }
  }
}
