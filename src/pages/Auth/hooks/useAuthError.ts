import { useState } from "react";

import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

import type { AxiosError } from "axios";

export const useAuthError = () => {
  const [error, setError] = useState("");
  const { showSnackbar } = useCustomSnackbar();

  const handleError = (error: AxiosError<{ message: string }>) => {
    const errorMessage = error.response?.data?.message ?? error.message ?? "Authentication failed";
    setError(errorMessage);
    showSnackbar({ message: errorMessage, variant: "error" });
  };

  return { error, handleError };
};
