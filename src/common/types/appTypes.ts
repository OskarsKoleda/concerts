import { SxProps } from "@mui/material";
import { Control, UseControllerProps } from "react-hook-form";

export type ArrowFunction<T extends unknown> = () => T;
export type VoidArrowFunction = ArrowFunction<void>;
export type Nullable<T> = T | null;

export type WithValidationWrapperProps = {
  control: Control<any, Record<string, unknown>>;
  controlName: string;
  rules?: UseControllerProps["rules"];
  sx?: SxProps;
  id?: string;
};

export type ReadonlyControl = {
  readonly?: boolean;
};

export type WithTooltip = {
  tooltipText?: string;
};
