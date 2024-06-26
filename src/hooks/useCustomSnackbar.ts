import { OptionsObject, VariantType, useSnackbar } from "notistack";

interface CustomSnackbarProps {
  message: string;
  variant?: VariantType;
  anchorOrigin?: OptionsObject["anchorOrigin"];
  autoHideDuration?: number;
}

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = ({
    message,
    variant = "default",
    anchorOrigin = { horizontal: "right", vertical: "top" },
    autoHideDuration = 3000,
  }: CustomSnackbarProps) => {
    enqueueSnackbar(message, { variant, anchorOrigin, autoHideDuration });
  };

  return { showSnackbar };
};

export default useCustomSnackbar;
