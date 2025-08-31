import { MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { FilterInputType } from "./constants";
import { toggleButtonGroupStyles, toggleButtonStyles } from "./styles.ts";

import type { FilterInputsConfigItem } from "./types";

export function generateFilterFields(input: FilterInputsConfigItem): JSX.Element {
  const { id, inputType, value, label, placeholder } = input;

  switch (inputType) {
    case FilterInputType.Text: {
      const { onChange } = input;

      return (
        <TextField
          id={id}
          label={label}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          sx={{ backgroundColor: "#FFF" }}
          size="small"
        />
      );
    }

    case FilterInputType.Select: {
      const { options } = input;

      return (
        <Select id={id} label={label} placeholder={placeholder} value={value}>
          {options.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      );
    }

    case FilterInputType.ToggleButton: {
      const { options, onChange } = input;

      return (
        <ToggleButtonGroup
          id={id}
          onChange={onChange}
          value={value}
          size="small"
          exclusive
          sx={toggleButtonGroupStyles}
        >
          {options.map((option: string) => (
            <ToggleButton key={option} value={option} sx={toggleButtonStyles}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      );
    }
  }
}
