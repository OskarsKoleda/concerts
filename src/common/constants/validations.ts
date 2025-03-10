import type { UseControllerProps } from "react-hook-form";

export const NOT_ALL_WHITESPACE_PATTERN = /^\S\S*/;

export const EVENT_TITLE_RULES: UseControllerProps["rules"] = {
  pattern: NOT_ALL_WHITESPACE_PATTERN,
  required: true,
  minLength: 3,
  validate: (value: string) => {
    if (value.length > 50) {
      return "Title cannot exceed 50 characters";
    }
  },
};

export const TICKET_PRICE_RULES: UseControllerProps["rules"] = {
  required: true,
  validate: (value: number) => {
    if (value < 0) {
      return "Enter a positive value";
    }
  },
};

export const CITY_RULES: UseControllerProps["rules"] = {
  required: true,
};
