import { useSnackbar } from "notistack";

import type { OptionsObject, VariantType } from "notistack";

type CustomSnackbarProps = {
  message: string;
  variant?: VariantType;
  anchorOrigin?: OptionsObject["anchorOrigin"];
  autoHideDuration?: number;
};

export const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = ({
    message,
    variant = "default",
    anchorOrigin = { horizontal: "center", vertical: "bottom" },
    autoHideDuration = 2000,
  }: CustomSnackbarProps) => {
    enqueueSnackbar(message, { variant, anchorOrigin, autoHideDuration });
  };

  return { showSnackbar };
};
