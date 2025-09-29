import { useState } from "react";

import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

import type { AxiosErrorResponse } from "../../../common/types/appTypes";

export const useAuthError = () => {
  const [error, setError] = useState("");
  const { showSnackbar } = useCustomSnackbar();

  const handleError = (error: AxiosErrorResponse) => {
    const errorMessage = error.response?.data?.message ?? error.message ?? "Authentication failed";
    setError(errorMessage);
    showSnackbar({ message: errorMessage, variant: "error" });
  };

  return { error, handleError };
};
