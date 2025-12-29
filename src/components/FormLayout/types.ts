import type { SelectProps } from "@mui/material";
import type { ReactNode } from "react";
import type { ReadonlyControl, WithValidationWrapperProps } from "../../common/types/appTypes.ts";
import type { TextFieldWithValidationProps } from "../Inputs/reactHookForm/TextFieldWithValidation/TextFieldWithValidation.tsx";
import type { InputType } from "./constants.ts";

type CommonInputFieldProps = Omit<TextFieldWithValidationProps, "type" | "control"> &
  BaseFieldParams;

interface BaseFieldParams {
  controlName: string;
  id: string;
  label: string;
  tooltipText?: string;
  xs?: number;
  hide?: boolean;
}

export type FormContent = FormFields | FormSections;

export type FormFields = Array<FormField>;
export type FormSections = Array<FormSection>;

interface FormSection {
  id: string | number;
  fields: FormFields;
  header?: ReactNode;
  footer?: ReactNode;
}

export type FormField =
  | SelectField
  | TextField
  | PasswordField
  | AutocompleteTextField
  | NumberField
  | DateField;

type SelectField = Omit<SelectWithValidationProps, "control"> &
  BaseFieldParams & {
    inputType: InputType.Select;
  };

export type SelectWithValidationProps = ReadonlyControl & SelectProps & WithValidationWrapperProps;

type TextField = CommonInputFieldProps & {
  inputType: InputType.Text;
};

type PasswordField = CommonInputFieldProps & {
  inputType: InputType.Password;
};

type AutocompleteTextField = CommonInputFieldProps & {
  inputType: InputType.AutocompleteText;
};

type NumberField = CommonInputFieldProps & {
  inputType: InputType.Number;
};

type DateField = CommonInputFieldProps & {
  inputType: InputType.Date;
  // value: Date | null;
  // onChange: (date: Date | null) => void;
};
