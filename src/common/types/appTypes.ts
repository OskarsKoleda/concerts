import type { ButtonProps, SxProps } from "@mui/material";
import type { AxiosError } from "axios";
import type { Control, UseControllerProps } from "react-hook-form";

export type Nullable<T> = T | null;
export type Option<T> = T | undefined;
export type Maybe<T> = Nullable<T> | Option<T>;

export type ArrowFunction<T> = () => T;
export type VoidArrowFunction = ArrowFunction<void>;

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

export type ControlPayload = ButtonProps & {
  text: string;
  id?: string;
  visible?: boolean;
  loading?: boolean;
};

export type AxiosErrorResponse = AxiosError<{ message: string }>;
