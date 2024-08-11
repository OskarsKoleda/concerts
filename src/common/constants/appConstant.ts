import type { UseControllerProps } from "react-hook-form";

export const URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.|:[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

export const NOT_ALL_WHITESPACE_PATTERN = /^\S\S*/;

export enum ResponseMessages {
  CONCERT_SUCCESSFUL_CREATION = "The concert was successfully CREATED!",
  CONCERT_SUCCESSFUL_DELETION = "The concert was successfully REMOVED!",
  CONCERT_SUCCESSFUL_UPDATE = "The concert was successfully UPDATED!",
  CONCERT_UPDATE_FAILURE = "Couldn't update the concert. Something went wrong!",
  CONCERT_DELETION_FAILURE = "Couldn't delete the concert. Something went wrong!",
  CONCERT_NOT_FOUND = "The concert was not found!",
  CONCERT_RETRIEVE_FAILED = "Could not retrieve the concert. Unknown problem.",
}

export const EVENT_TITLE_RULES: UseControllerProps["rules"] = {
  pattern: NOT_ALL_WHITESPACE_PATTERN,
  required: true,
  minLength: 3,
  validate: (value: string) => {
    if (value.length > 30) {
      return "Title cannot exceed 30 characters!";
    }
  },
};

export const ERROR_TEXTS: Record<string, string> = {
  maxLength: "The field is too long",
  required: "The field is required",
  minLength: "The field is too short",
  pattern: "Incorrect input format",
};
