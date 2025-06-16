import type { ButtonProps } from "@mui/material";
import type React from "react";

import type { Maybe } from "../../common/types/appTypes";
import type { EventCategoryFilter } from "../../store/eventList/eventFilters/types";

import type { FilterInputType } from "./constants";

export type FilterInputsConfigItem = TextFilterProps | SelectFilterProps | ToggleButtonFilterProps;

export type TextFilterProps = {
  inputType: FilterInputType.text;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
} & FilterInputProps;

export type SelectFilterProps = {
  inputType: FilterInputType.select;
  options: string[];
} & FilterInputProps;

export type ToggleButtonFilterProps = {
  inputType: FilterInputType.toggleButton;
  options: string[];
  onChange: (_: React.MouseEvent<HTMLElement>, value: EventCategoryFilter) => void;
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
