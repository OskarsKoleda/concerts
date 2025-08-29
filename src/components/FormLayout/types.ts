import type { SelectProps } from "@mui/material";
import type { ReactNode } from "react";
import type { ReadonlyControl, WithValidationWrapperProps } from "../../common/types/appTypes.ts";
import type { TextFieldWithValidationProps } from "../Inputs/reactHookForm/TextFieldWithValidation/TextFieldWithValidation.tsx";
import type { InputType } from "./constants";

interface BaseFieldParams {
  controlName: string;
  id: string;
  label: string;
  tooltipText?: string;
  xs?: number;
  hide?: boolean;
}

interface FormSection {
  fields: FormFields;
  id: string | number;
  header?: ReactNode;
  footer?: ReactNode;
}

type CommonInputFieldProps = Omit<TextFieldWithValidationProps, "type" | "control"> &
  BaseFieldParams;

export type SelectWithValidationProps = ReadonlyControl & SelectProps & WithValidationWrapperProps;

type SelectField = Omit<SelectWithValidationProps, "control"> &
  BaseFieldParams & {
    inputType: InputType.select;
  };

type TextField = CommonInputFieldProps & {
  inputType: InputType.text;
};

type DateField = CommonInputFieldProps & {
  inputType: InputType.date;
  // value: Date | null;
  // onChange: (date: Date | null) => void;
};

type AutocompleteTextField = CommonInputFieldProps & {
  inputType: InputType.autocompleteText;
};

type NumberField = CommonInputFieldProps & {
  inputType: InputType.number;
};

export type FormField = SelectField | TextField | AutocompleteTextField | NumberField | DateField;
export type FormFields = Array<FormField>;

export type FormSections = Array<FormSection>;
export type FormContent = FormFields | FormSections;
