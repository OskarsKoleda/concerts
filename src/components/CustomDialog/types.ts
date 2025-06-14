import type { ButtonOwnProps } from "@mui/material";

export type CustomDialogProps = {
  show: boolean;
  title: string;
  content: string;
  proceedButtonColor: ButtonOwnProps["color"];
  setShow: (value: boolean) => void;
  onConfirm: () => void;
};
