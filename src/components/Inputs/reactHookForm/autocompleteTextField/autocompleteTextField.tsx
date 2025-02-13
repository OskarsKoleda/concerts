import type { TextFieldProps } from "@mui/material";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";
import { ChipsReadonlyField } from "../../chipsReadonlyField/chipsReadonlyField";

import type {
  ReadonlyControl,
  WithTooltip,
  WithValidationWrapperProps,
} from "../../../../common/types/appTypes";

type AutocompleteTextFieldProps = Pick<
  TextFieldProps,
  "disabled" | "label" | "placeholder" | "InputLabelProps" | "helperText"
> &
  WithValidationWrapperProps &
  ReadonlyControl &
  WithTooltip;

export const AutocompleteTextField: React.FC<AutocompleteTextFieldProps> = (props) => {
  const { control, controlName, label, placeholder, readonly, sx, tooltipText } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field }) => {
        if (readonly) {
          return <ChipsReadonlyField label={label} sx={sx} values={field.value} />;
        }

        return (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            // getOptionLabel={(option) => option}
            value={field.value || []}
            onChange={(_, newValue) => {
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
};
