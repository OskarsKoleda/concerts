import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

import type { SelectWithValidationProps } from "../../../FormLayout/types.ts";
import ReadonlyField from "../../ReadonlyField/ReadonlyField.tsx";

const SelectWithValidation = (props: SelectWithValidationProps) => {
  const { control, controlName, children = [], rules, readonly, label } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        if (readonly) return <ReadonlyField label={label} value={field.value ?? ""} />;

        return (
          <Box>
            <InputLabel shrink>{label}</InputLabel>
            <Select {...field} error={!!error} fullWidth>
              {Array.isArray(children) &&
                children.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        );
      }}
    />
  );
};

export default SelectWithValidation;
