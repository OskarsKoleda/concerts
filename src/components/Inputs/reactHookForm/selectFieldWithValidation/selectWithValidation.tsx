import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

import { ReadonlyField } from "../../readonly/readonly";

import type {
  ReadonlyControl,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";
import type { SelectProps } from "@mui/material";

export type SelectWithValidationProps = ReadonlyControl & SelectProps & WithValidationWrapperProps;

export function SelectWithValidation(props: SelectWithValidationProps) {
  const { control, controlName, children = [], rules, readonly, label } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        if (readonly) {
          return <ReadonlyField label={label} value={field.value || ""} />;
        }

        return (
          <Box>
            <InputLabel shrink>{label}</InputLabel>
            <Select {...field} error={!!error} fullWidth>
              {Array.isArray(children) &&
                children.map((opt: string) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        );
      }}
    />
  );
}
