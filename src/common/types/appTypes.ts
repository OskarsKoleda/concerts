import { SxProps, Theme } from "@mui/material";
import { Control, UseControllerProps } from "react-hook-form";

export type WithValidationWrapperProps = {
  control: Control<any, Record<string, unknown>>;
  controlName: string;
  rules?: UseControllerProps["rules"];
  sx?: SxProps<Theme>;
  id?: string;
};

export type ReadonlyControl = {
  readonly?: boolean;
};
