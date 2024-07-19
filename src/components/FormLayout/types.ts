import { ReactNode } from "react";
import { SelectWithValidationProps } from "../Inputs/reactHookForm/selectFieldWithValidation/selectWithValidation";
import { InputType } from "./constants";
import { TextFieldWithValidationProps } from "../Inputs/reactHookForm/textFieldWithValidation/textFieldWithValidation";

export type BaseFieldParams = {
  controlName: string;
  id: string;
  label: string;
  tooltipText?: string;
  xs?: number;
  maskReadonlyValue?: boolean;
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

export type AutocompleteTextField = CommonInputFieldProps & {
  inputType: InputType.autocompleteText;
}

export type FormField = SelectField | TextField | AutocompleteTextField;
export type FormFields = Array<FormField>;

export type FormSection = {
  fields: FormFields;
  id: string | number;
  header?: ReactNode;
  footer?: ReactNode;
};

export type FormSections = Array<FormSection>;
export type FormContent = FormFields | FormSections;
