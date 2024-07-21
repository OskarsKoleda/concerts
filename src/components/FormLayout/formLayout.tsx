import { FC, memo, ReactNode, useCallback } from "react";
import { FormContent, FormField } from "./types";
import { Control } from "react-hook-form";
import { InputType } from "./constants";
import { SelectWithValidation } from "../Inputs/reactHookForm/selectFieldWithValidation/selectWithValidation";
import { Box, Grid, Typography } from "@mui/material";
import { isFormSection } from "./utils";
import { gridStyles, layoutWrapperStyles } from "./styles";
import { TextFieldWithValidation } from "../Inputs/reactHookForm/textFieldWithValidation/textFieldWithValidation";
import { AutocompleteTextField } from "../Inputs/reactHookForm/autocompleteTextField/autocompleteTextField";

export interface FormLayoutProps {
  content: FormContent;
  control: Control<any, Record<string, unknown>>;
  title: string;
  readonly?: boolean;
  disabled?: boolean;
  footer?: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = memo(function FormLayout({
  content,
  control,
  disabled,
  readonly,
  title,
}) {
  //   const {
  //     formState: { isDirty },
  //   } = useFormContext();
  //   useTabCloseAlert(isDirty);

  const renderFieldInput = useCallback(
    (field: FormField) => {
      const formFieldProps = {
        control,
        disabled,
        readonly,
      };

      switch (field.inputType) {
        case InputType.text: {
          return (
            <TextFieldWithValidation
              {...formFieldProps}
              {...field}
              sx={{ width: "100%" }}
              type="text"
            />
          );
        }

        case InputType.select:
          return <SelectWithValidation {...formFieldProps} {...field} />;

        case InputType.autocompleteText:
          return <AutocompleteTextField {...formFieldProps} {...field} />;

        case InputType.number: {
          return (
            <TextFieldWithValidation
              {...formFieldProps}
              {...field}
              sx={{ width: "100%" }}
              type="number"
            />
          );
        }

        default:
          return null;
      }
    },
    [control, disabled, readonly],
  );

  const renderField = useCallback(
    (field: FormField) => {
      if (!field.hide) {
        return (
          <Grid key={field.id} item xs={field.xs || 12} rowSpacing={1.5}>
            {renderFieldInput(field)}
          </Grid>
        );
      }
    },
    [renderFieldInput],
  );

  return (
    <Box sx={layoutWrapperStyles}>
      <Typography mt={1} variant="body2">
        {title}
      </Typography>
      {isFormSection(content) ? (
        content.map((formSection) => (
          <Box key={formSection.id}>
            {formSection.header}
            <Grid container>{formSection.fields.map(renderField)}</Grid>
            {formSection.footer}
          </Box>
        ))
      ) : (
        <Grid container columnSpacing={2.5} rowSpacing={1.5} sx={gridStyles}>
          {content.map(renderField)}
        </Grid>
      )}
    </Box>
  );
});
