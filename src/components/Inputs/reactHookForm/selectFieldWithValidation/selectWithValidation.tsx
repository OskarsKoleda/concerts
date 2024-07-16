import { Box, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { ReadonlyControl, WithValidationWrapperProps } from "../../../../common/types/appTypes";
import { Controller } from "react-hook-form";

export type SelectWithValidationProps = ReadonlyControl & SelectProps & WithValidationWrapperProps;

export function SelectWithValidation(props: SelectWithValidationProps) {
  const {
    control,
    controlName,
    children = [],
    // id,
    // label,
    // multiple = false,
    // placeholder,
    rules,
    // sx,
    title,
    inputProps,
  } = props;

  console.log(inputProps);

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box>
            <InputLabel shrink>{title}</InputLabel>

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
