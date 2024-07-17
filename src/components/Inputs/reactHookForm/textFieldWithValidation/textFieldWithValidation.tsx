import { Box, TextField, TextFieldProps, Tooltip } from "@mui/material";
import {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";
import { Controller } from "react-hook-form";
import { ChangeEvent } from "react";
import { ReadonlyField } from "../../readonly/readonly";

export type TextFieldWithValidationProps = Omit<
  TextFieldProps,
  "onChange" | "value" | "required" | "InputProps"
> &
  WithValidationWrapperProps &
  ReadonlyControl & {
    onChange?: (value: string) => void;
  } & WithTooltip;

export function TextFieldWithValidation(props: TextFieldWithValidationProps) {
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
      ...(inputProps && inputProps),
    },
  };

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

        if (readonly) {
          return (
            <ReadonlyField
              label={label}
              value={field.value || ""}
              tooltipText={field.value || ""}
            />
          );
        }

        return (
          <Tooltip title={tooltipText || ""}>
            <Box>
              <TextField
                InputProps={processedInputProps}
                error={Boolean(error)}
                label={label}
                name={field.name}
                onChange={handleChangeEvent}
                disabled={disabled}
                placeholder={placeholder}
                required={Boolean(rules.required)}
                sx={sx}
                type={type}
                value={field.value || ""}
              />
            </Box>
          </Tooltip>
        );
      }}
    />
  );
}
