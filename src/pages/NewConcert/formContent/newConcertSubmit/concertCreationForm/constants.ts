import { UseControllerProps } from "react-hook-form";
import { URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL } from "../../../../../common/constants/appConstant";

export const POSTER_URL_VALIDATION_RULES: UseControllerProps["rules"] = {
  pattern: {
    value: URL_VALIDATION_PATTERN_PROTOCOL_OPTIONAL,
    message: 'Please provide correct URL!'
  },
  validate: (value) => {
    if (!value) {
      return true;
    }
  },
};
