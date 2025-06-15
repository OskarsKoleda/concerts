import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar.ts";
import { useRootStore } from "../../store/StoreContext.tsx";

export const ErrorToast = () => {
  const {
    transport: {
      appState: { activeError },
    },
  } = useRootStore();

  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    if (activeError.message) {
      showSnackbar({
        message: activeError.message,
        variant: SnackbarVariantType.ERROR,
      });
    }
  }, [showSnackbar, activeError]);

  return <></>;
};

export default observer(ErrorToast);
