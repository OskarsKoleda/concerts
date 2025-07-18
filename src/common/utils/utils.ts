import { format, parseISO } from "date-fns";
import type { FieldError } from "react-hook-form";

import { DATE_FORMAT, ERROR_TEXTS } from "../constants/appConstant";

export const getInputErrorText = (error: FieldError): string | null => {
  if (!error) {
    return null;
  }

  const supportedText = ERROR_TEXTS[error.type];
  const errorText = error.message;

  return supportedText || errorText || null;
};

export const formatDateToDefault = (date: string): string => {
  return format(parseISO(date), DATE_FORMAT);
};
