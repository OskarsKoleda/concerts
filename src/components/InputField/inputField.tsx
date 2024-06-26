import { TextField } from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  rules?: RegisterOptions;
  type: string;
  fullWidth: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  rules,
  disabled = false,
  fullWidth,
  type = "text",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            label={label}
            disabled={disabled}
            type={type}
            error={!!error}
            fullWidth={fullWidth}
            helperText={error ? error.message : ""}
            variant="outlined"
          />
        );
      }}
    />
  );
};

export default InputField;
