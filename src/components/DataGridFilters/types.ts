import type { ButtonProps } from "@mui/material";
import type React from "react";
import type { Maybe } from "../../common/types/appTypes";
import type { EventCategoryType } from "../../pages/EventDetails/types";
import type { InputType } from "../FormLayout/constants";

export type FilterInputsConfig = {
  inputs: Array<FilterInputsConfigItem>;
  buttons: Array<FilterButtonProps>;
};

export type FilterInputsConfigItem = TextFilterProps | SelectFilterProps | ToggleButtonFilterProps;

export type TextFilterProps = {
  inputType: InputType.Text;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
} & FilterInputProps;

export type SelectFilterProps = {
  inputType: InputType.Select;
  options: string[];
} & FilterInputProps;

export type ToggleButtonFilterProps = {
  inputType: InputType.ToggleButton;
  onChange: (_: React.MouseEvent<HTMLElement>, value: EventCategoryType) => void;
  options: string[];
} & FilterInputProps;

export type FilterInputProps = {
  id: string;
  value: Maybe<string>;
  label?: string;
  placeholder?: string;
};

export type FilterButtonProps = {
  label: string;
} & ButtonProps;
