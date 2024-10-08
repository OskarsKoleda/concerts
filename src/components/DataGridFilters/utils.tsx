import { Box, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { FilterInputType } from "./constants";
import { toggleButtonLabelStyles } from "./styles";

import type { FilterInputsConfigItem } from "./types";

export const generateFilterFields = (input: FilterInputsConfigItem) => {
  const type = input.inputType;

  switch (type) {
    case FilterInputType.text: {
      return (
        <TextField
          id={input.id}
          label={input.label}
          onChange={input.onChange}
          placeholder={input.placeholder}
          value={input.value}
          sx={{ backgroundColor: "#FFF" }}
          variant="standard"
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
        <Box>
          <ToggleButtonGroup
            id={input.id}
            onChange={input.onChange}
            size="small"
            sx={toggleButtonLabelStyles}
            value={input.value}
            exclusive
          >
            {input.options.map((value) => (
              <ToggleButton key={value} value={value}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      );
    }
  }
};
