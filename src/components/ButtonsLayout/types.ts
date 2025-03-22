import type { ButtonProps } from "@mui/material";

export type ControlPayload = ButtonProps & {
  text: string;
  id?: string;
  visible?: boolean;
  loading?: boolean;
};
