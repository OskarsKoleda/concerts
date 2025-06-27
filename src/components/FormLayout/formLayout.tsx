import { Box, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import { memo, useCallback } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import { DATE_FORMAT } from "../../common/constants/appConstant";
import AutocompleteTextField from "../Inputs/reactHookForm/AutocompleteTextField/AutocompleteTextField.tsx";
import SelectWithValidation from "../Inputs/reactHookForm/SelectWithValidation/SelectWithValidation.tsx";
import TextFieldWithValidation from "../Inputs/reactHookForm/TextFieldWithValidation/TextFieldWithValidation.tsx";

import { InputType } from "./constants";
import type { FormContent, FormField } from "./types";
import { isFormSection } from "./utils";

interface FormLayoutProps {
  content: FormContent;
  control: Control<any, Record<string, unknown>>;
  title: string;
  readonly?: boolean;
  disabled?: boolean; // TODO: is this needed?
  footer?: ReactNode;
}

const FormLayout = ({ content, control, disabled, readonly, title }: FormLayoutProps) => {
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
                  format={DATE_FORMAT}
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
          <Grid key={field.id} item xs={field.xs ?? 12} rowSpacing={1.5}>
            {renderFieldInput(field)}
          </Grid>
        );
      }
    },
    [renderFieldInput],
  );

  return (
    <>
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
        <Grid container columnSpacing={2.5} rowSpacing={1.5} mt={0}>
          {content.map(renderField)}
        </Grid>
      )}
    </>
  );
};

export default memo(FormLayout);
