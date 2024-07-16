import { SxProps, Theme } from "@mui/material";
import { Control, UseControllerProps } from "react-hook-form";

export type ArrowFunction<T extends unknown> = () => T;
export type VoidArrowFunction = ArrowFunction<void>;
export type Nullable<T> = T | null;

export type WithValidationWrapperProps = {
  control: Control<any, Record<string, unknown>>;
  controlName: string;
  rules?: UseControllerProps["rules"];
  sx?: SxProps<Theme>;
  id?: string;
};

export type ReadonlyControl = {
  readonly?: boolean;
  maskReadonlyValue?: boolean;
};

export type WithTooltip = {
  tooltipText?: string;
};
