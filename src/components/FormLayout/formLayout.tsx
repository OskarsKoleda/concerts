import { memo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { AutocompleteTextField } from "../Inputs/reactHookForm/autocompleteTextField/autocompleteTextField";
import { TextFieldWithValidation } from "../Inputs/reactHookForm/textFieldWithValidation/textFieldWithValidation";
import { SelectWithValidation } from "../Inputs/reactHookForm/selectFieldWithValidation/selectWithValidation";

import { gridStyles, layoutWrapperStyles } from "./styles";
import { isFormSection } from "./utils";
import { InputType } from "./constants";

import type { Control } from "react-hook-form";
import type { FormContent, FormField } from "./types";
import type { FC, ReactNode } from "react";

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

        case InputType.date: {
          return (
            <Controller
              name={field.controlName}
              control={control}
              render={({ field: controllerField }) => (
                <DatePicker
                  label={field.label}
                  value={new Date(controllerField.value)}
                  onChange={controllerField.onChange}
                  disabled={readonly}
                  format="dd.MM.yyyy"
                />
              )}
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
