import { ERROR_TEXTS } from "./appConstant";

import type { FieldError } from "react-hook-form";

export const getInputErrorText = (error: FieldError): string | null => {
  if (!error) {
    return null;
  }

  const supportedText = ERROR_TEXTS[error.type];
  const errorText = error.message;

  return supportedText || errorText || null;
};
