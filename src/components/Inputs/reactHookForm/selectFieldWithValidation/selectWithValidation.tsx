import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

import { ReadonlyField } from "../../readonly/readonly";

import type { ReactElement } from "react";
import type {
  ReadonlyControl,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";
import type { SelectProps } from "@mui/material";

type AdditionalProperties = {
  readonlyChip?: ReactElement;
};

export type SelectWithValidationProps = ReadonlyControl &
  SelectProps &
  WithValidationWrapperProps &
  AdditionalProperties;

export function SelectWithValidation(props: SelectWithValidationProps) {
  const { control, controlName, children = [], rules, readonly, label, readonlyChip } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        if (readonlyChip) {
          return <>{readonlyChip}</>;
        }

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
