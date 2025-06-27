import type { TextFieldProps } from "@mui/material";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";

import type {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";
import { ChipsReadonlyField } from "../../ChipsReadonlyField/ChipsReadonlyField.tsx";

type AutocompleteTextFieldProps = Pick<
  TextFieldProps,
  "disabled" | "label" | "placeholder" | "InputLabelProps" | "helperText" | "sx"
> &
  WithValidationWrapperProps &
  ReadonlyControl &
  WithTooltip;

const AutocompleteTextField = (props: AutocompleteTextFieldProps) => {
  const { control, controlName, label, placeholder, readonly, tooltipText } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { value, onChange } }) => {
        if (readonly) {
          return <ChipsReadonlyField label={label} values={value} />;
        }

        return (
          <Autocomplete
            multiple
            freeSolo
            clearIcon={false}
            options={[]}
            getOptionLabel={(option) => option}
            value={value ?? []}
            onChange={(_, newValue) => {
              onChange(newValue);
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
};

export default AutocompleteTextField;
