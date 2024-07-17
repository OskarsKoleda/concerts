export const URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.|:[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

export const ERROR_TEXT: Record<string, string> = {
  pattern: "Incorrect input format",
};

export const SNACKBAR_TEXT: Record<string, string> = {
  CONCERT_SUCCESSFUL_CREATION: "The concert was successfully CREATED!",
  CONCERT_SUCCESSFUL_DELETION: "The concert was successfully REMOVED!",
  CONCERT_SUCCESSFUL_UPDATE: "The concert was successfully UPDATED!",
  CONCERT_DELETION_FAILURE: "Couldn't delete the concert. Something went wrong!"
};
