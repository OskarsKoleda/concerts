import type { UseControllerProps } from "react-hook-form";

export const URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.|:[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

export const NOT_ALL_WHITESPACE_PATTERN = /^\S\S*/;

export enum ResponseMessages {
  EVENT_SUCCESSFUL_CREATION = "The event was successfully CREATED!",
  EVENT_UPDATE_FAILURE = "Could not update the event. Something went wrong!",
  EVENT_DELETION_FAILURE = "Could not delete the event. Something went wrong!",
  EVENT_NOT_FOUND = "The event was not found!",
  EVENT_FAILED_RETRIEVE = "Could not retrieve the event. Unknown problem.",
  EVENT_FAILED_CREATION = "Could not create the event. Something went wrong!",
  EVENT_SUCCESSFUL_UPDATE = "The event was successfully updated!",
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

export const DATE_FORMAT = "dd.MM.yyyy";
