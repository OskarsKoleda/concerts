import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { WithValidationWrapperProps, ReadonlyControl } from "../../common/types/appTypes";
import { ChangeEvent } from "react";
import { getInputErrorText } from "../../common/utils/utility";

type TextFieldWithValidationProps = Omit<TextFieldProps, "onChange"> &
  WithValidationWrapperProps &
  ReadonlyControl & { onChange?: (value: string) => void };

export function InputField(props: TextFieldWithValidationProps) {
  const { label, type, control, controlName, rules, sx, fullWidth, onChange } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          field.onChange(value);
          onChange && onChange(value); // this will call external callback on value change
        };

        return (
          <TextField
            label={label}
            type={type}
            value={field.value || ""}
            sx={sx}
            error={Boolean(error)}
            fullWidth={fullWidth}
            onChange={handleChangeEvent}
            helperText={error ? getInputErrorText(error) : ""}
            // variant="outlined"
            // disabled={disabled}
          />
        );
      }}
    />
  );
}
