import type { OptionsObject, VariantType } from "notistack";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

interface CustomSnackbarProps {
  message: string;
  variant?: VariantType;
  anchorOrigin?: OptionsObject["anchorOrigin"];
  autoHideDuration?: number;
}

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = useCallback(
    ({
      message,
      variant = "default",
      anchorOrigin = { horizontal: "center", vertical: "bottom" },
      autoHideDuration = 2000,
    }: CustomSnackbarProps) => {
      enqueueSnackbar(message, { variant, anchorOrigin, autoHideDuration });
    },
    [enqueueSnackbar],
  );

  return { showSnackbar };
};

export default useCustomSnackbar;
