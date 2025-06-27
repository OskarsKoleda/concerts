import type { TextFieldProps } from "@mui/material";
import { Box, TextField, Tooltip } from "@mui/material";
import type { ChangeEvent } from "react";
import { Controller } from "react-hook-form";

import type {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes.ts";
import { getInputErrorText } from "../../../../common/utils/utils";
import ReadonlyField from "../../ReadonlyField/ReadonlyField.tsx";

export type TextFieldWithValidationProps = Omit<
  TextFieldProps,
  "onChange" | "value" | "required" | "InputProps"
> &
  WithValidationWrapperProps &
  ReadonlyControl &
  WithTooltip;

const TextFieldWithValidation = (props: TextFieldWithValidationProps) => {
  const {
    control,
    controlName,
    disabled,
    label,
    placeholder,
    readonly,
    rules = {},
    sx,
    type,
    tooltipText,
    inputProps,
  } = props;

  const processedInputProps = {
    inputProps: {
      ...inputProps,
    },
  };

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => {
        const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;

          onChange(value);
        };

        if (readonly)
          return <ReadonlyField label={label} value={value ?? ""} tooltipText={value ?? ""} />;

        return (
          <Tooltip title={tooltipText}>
            <Box>
              <TextField
                InputProps={processedInputProps}
                error={Boolean(error)}
                label={label}
                name={name}
                onChange={handleChangeEvent}
                disabled={disabled}
                placeholder={placeholder}
                required={Boolean(rules.required)}
                helperText={error ? getInputErrorText(error) : null}
                sx={sx}
                type={type}
                value={value ?? ""}
              />
            </Box>
          </Tooltip>
        );
      }}
    />
  );
};

export default TextFieldWithValidation;
