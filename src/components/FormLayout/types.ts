import type { ReactNode } from "react";

import type { SelectWithValidationProps } from "../Inputs/reactHookForm/selectFieldWithValidation/selectWithValidation";
import type { TextFieldWithValidationProps } from "../Inputs/reactHookForm/textFieldWithValidation/textFieldWithValidation";

import type { InputType } from "./constants";

export type BaseFieldParams = {
  controlName: string;
  id: string;
  label: string;
  tooltipText?: string;
  xs?: number;
  hide?: boolean;
};

export type SelectField = Omit<SelectWithValidationProps, "control"> &
  BaseFieldParams & {
    inputType: InputType.select;
  };

// export type FormField = SelectField | SwitchField | TextField | NumberField;

type CommonInputFieldProps = Omit<TextFieldWithValidationProps, "control" | "type"> &
  BaseFieldParams;

export type TextField = CommonInputFieldProps & {
  inputType: InputType.text;
};

export type DateField = CommonInputFieldProps & {
  inputType: InputType.date;
  // value: Date | null;
  // onChange: (date: Date | null) => void;
};

export type AutocompleteTextField = CommonInputFieldProps & {
  inputType: InputType.autocompleteText;
};

export type NumberField = CommonInputFieldProps & {
  inputType: InputType.number;
};

export type FormField = SelectField | TextField | AutocompleteTextField | NumberField | DateField;
export type FormFields = Array<FormField>;

export type FormSection = {
  fields: FormFields;
  id: string | number;
  header?: ReactNode;
  footer?: ReactNode;
};

export type FormSections = Array<FormSection>;
export type FormContent = FormFields | FormSections;
