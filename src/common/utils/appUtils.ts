export function getErrorMessage(error: unknown, defaultMessage = "Error occurred"): string {
  let message: string | undefined;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = defaultMessage;
  }

  return message;
}
