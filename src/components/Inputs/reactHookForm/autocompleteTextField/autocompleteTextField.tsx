import { Autocomplete, TextField, TextFieldProps, Tooltip } from "@mui/material";
import {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";
import { Controller } from "react-hook-form";
import { ChipsReadonlyField } from "../../chipsReadonlyField/chipsReadonlyField";

type AutocompleteTextFieldProps = Pick<
  TextFieldProps,
  "disabled" | "label" | "placeholder" | "InputLabelProps" | "helperText"
> &
  WithValidationWrapperProps &
  ReadonlyControl &
  WithTooltip;

const bands = ["Alestorm", "Rammstein", "Slipknot"];

export function AutocompleteTextField(props: AutocompleteTextFieldProps) {
  const { control, controlName, label, placeholder, readonly, sx, tooltipText } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field }) => {
        if (readonly) {
          console.log(field.value);

          return (
            <ChipsReadonlyField
              label={label}
              sx={sx}
              values={field.value.split(", ")}
            />
          );
        }

        return (
          <Autocomplete
            multiple
            freeSolo
            options={bands}
            // getOptionLabel={(option) => option}
            value={field.value || []}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <Tooltip title={tooltipText}>
                <TextField {...params} label={label} placeholder={placeholder} />
              </Tooltip>
            )}
          />
        );
      }}
    />
  );
}
