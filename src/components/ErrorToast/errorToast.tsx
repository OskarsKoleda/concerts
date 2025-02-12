import type React from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext.tsx";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar.ts";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";

export const ErrorToast: React.FC = observer(function ErrorToast() {
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
});
