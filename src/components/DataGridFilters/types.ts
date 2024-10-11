import type { ButtonProps } from "@mui/material";
import type { Maybe } from "../../common/types/appTypes";
import type { FilterInputType } from "./constants";

export type FilterInputProps = {
  label?: string;
  placeholder?: string;
  id: string;
  value: Maybe<string>;
};

export type TextFilterProps = {
  inputType: FilterInputType.text;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & FilterInputProps;

export type SelectFilterProps = {
  inputType: FilterInputType.select;
  options: Array<string>;
  onChange: (option: string) => void;
} & FilterInputProps;

// TODO: exclude redundant props?
export type ToggleButtonFilterProps = {
  inputType: FilterInputType.toggleButton;
  onChange: (_: React.MouseEvent<HTMLElement>, value: string) => void;
  options: Array<string>;
} & FilterInputProps;

export type FilterButtonProps = {
  id: string;
  label: string;
  onClick: VoidFunction;
  color?: ButtonProps["color"];
  disabled?: boolean;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

export type FilterInputsConfigItem = TextFilterProps | SelectFilterProps | ToggleButtonFilterProps;

export type FilterInputsConfig = {
  inputs: Array<FilterInputsConfigItem>;
  buttons: Array<FilterButtonProps>;
};
