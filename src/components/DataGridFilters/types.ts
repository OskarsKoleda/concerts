import type { ButtonProps } from "@mui/material";
import type React from "react";
import type { Maybe } from "../../common/types/appTypes";
import type { FilterInputType } from "./constants";

export type FilterInputsConfigItem = TextFilterProps | SelectFilterProps | ToggleButtonFilterProps;

export type TextFilterProps = {
  inputType: FilterInputType.Text;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
} & FilterInputProps;

export type SelectFilterProps = {
  inputType: FilterInputType.Select;
  options: string[];
} & FilterInputProps;

export type ToggleButtonFilterProps = {
  inputType: FilterInputType.ToggleButton;
  options: string[];
  // onChange: (_: React.MouseEvent<HTMLElement>, value: EventCategoryFilter) => void;
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

export type FilterInputsConfig = {
  inputs: Array<FilterInputsConfigItem>;
  buttons: Array<FilterButtonProps>;
};
