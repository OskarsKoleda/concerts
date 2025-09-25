import { EventCategory } from "../enums/appEnums.ts";

import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

export const URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.|:[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

export const ERROR_TEXTS: Record<string, string> = {
  maxLength: "The field is too long",
  required: "The field is required",
  minLength: "The field is too short",
  pattern: "Incorrect input format",
};

export const DATE_FORMAT = "dd.MM.yyyy";

export const DATA_STALE_TIME = 1000;
export const DATA_CACHE_TIME = 300000;

export const eventCategoriesList: EventCategoryType[] = Object.values(EventCategory);
