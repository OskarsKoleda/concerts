import { Box, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

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
        />
      );
    }
    case FilterInputType.select: {
      return (
        <Select
          id={input.id}
          label={input.label}
          // onChange={input.onChange}
          children={input.options}
          placeholder={input.placeholder}
          value={input.value}
        />
      );
    }
    case FilterInputType.toggleButton: {
      return (
        <Box>
          <ToggleButtonGroup
            id={input.id}
            onChange={input.onChange}
            size="medium"
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
