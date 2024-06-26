import { FieldError } from "react-hook-form";
import { ConcertFormattedData, ConcertRawData } from "../types/concert";
import { ERROR_TEXT } from "../constants/appConstant";

export function transformFirebaseObject(concerts: ConcertRawData): ConcertFormattedData[] {
  return Object.keys(concerts).map((key) => ({
    ...concerts[key],
    id: key,
  }));
}

export const getInputErrorText = (error: FieldError): string | null => {
  if (!error) {
    return null;
  }

  const supportedText = ERROR_TEXT[error.type];
  const errorText = error.message;

  return supportedText || errorText || null;
};
