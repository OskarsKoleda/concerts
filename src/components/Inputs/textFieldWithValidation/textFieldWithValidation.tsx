import { Box, TextField, TextFieldProps, Tooltip } from "@mui/material";
import {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../common/types/appTypes";
import { Controller } from "react-hook-form";
import { ChangeEvent } from "react";

export type TextFieldWithValidationProps = TextFieldProps &
  WithValidationWrapperProps &
  ReadonlyControl &
  WithTooltip;

export function TextFieldWithValidation(props: TextFieldWithValidationProps) {
  const {
    control,
    controlName,
    disabled,
    id,
    label,
    placeholder,
    readonly,
    rules = {},
    sx,
    type,
    onChange,
    inputProps,
    tooltipText,
  } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          field.onChange(value);

          /** call external callback on value change */
          // onChange && onChange(value);
        };
        return (
          <Tooltip title={tooltipText || ""}>
            <Box>
              <TextField
                {...field}
                error={Boolean(error)}
                id={id}
                label={label}
                name={field.name}
                onChange={handleChangeEvent}
                disabled={disabled}
                placeholder={placeholder}
                required={Boolean(rules.required)}
                sx={sx}
                type={type}
                value={field.value || ""}
                inputProps={inputProps}
              />
            </Box>
          </Tooltip>
        );
      }}
    />
  );
}
