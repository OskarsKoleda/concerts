import { Box, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FilterInputType } from "./constants";
import { FilterInputsConfigItem } from "./types";
import { toggleButtonContainerStyles, toggleButtonLabelStyles } from "./styles";

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
        <Box sx={toggleButtonContainerStyles}>
          <Typography
            component="label"
            htmlFor={input.id}
            sx={toggleButtonLabelStyles}
            variant="body2"
          >
            {input.label}
          </Typography>
          <ToggleButtonGroup
            // variant="onWhiteBackground"
            id={input.id}
            onChange={input.onChange}
            size="small"
            sx={toggleButtonLabelStyles}
            value={input.value}
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
