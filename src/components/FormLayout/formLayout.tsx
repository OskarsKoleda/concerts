import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { memo, useCallback } from "react";
import { Controller } from "react-hook-form";

import { DATE_FORMAT } from "../../common/constants/appConstant.ts";

import { InputType } from "./constants.ts";
import { isFormSection } from "./utils.ts";

import type { ReactNode } from "react";
import type { Control } from "react-hook-form";
import type { FormContent, FormField } from "./types.ts";
import SelectWithValidation from "../Inputs/reactHookForm/SelectWithValidation/SelectWithValidation.tsx";
import TextFieldWithValidation from "../Inputs/reactHookForm/TextFieldWithValidation/TextFieldWithValidation.tsx";
import AutocompleteTextField from "../Inputs/reactHookForm/AutocompleteTextField/AutocompleteTextField.tsx";

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
        case InputType.Text: {
          return (
            <TextFieldWithValidation
              {...formFieldProps}
              {...field}
              sx={{ width: "100%" }}
              type="text"
            />
          );
        }

        case InputType.Select:
          return <SelectWithValidation {...formFieldProps} {...field} />;

        case InputType.AutocompleteText:
          return <AutocompleteTextField {...formFieldProps} {...field} />;

        case InputType.Number: {
          return (
            <TextFieldWithValidation
              {...formFieldProps}
              {...field}
              sx={{ width: "100%" }}
              type="number"
            />
          );
        }

        case InputType.Date: {
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
