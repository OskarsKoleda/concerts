import { ButtonProps } from "@mui/material";

export type ControlPayload = ButtonProps & {
  id?: string;
  text: string;
  visible?: boolean;
};

export type ButtonLayoutProps = {
  controls: ControlPayload[];
};
