import type { ButtonProps } from "@mui/material";

export type ControlPayload = ButtonProps & {
  id?: string;
  text: string;
  visible?: boolean;
};

