import { formatDateToDefault } from "../../common/utils/utils";

export const formatEventDate = (eventDate?: string, festivalEndDate?: string) => {
  if (eventDate && festivalEndDate) {
    return `${formatDateToDefault(eventDate)} - ${formatDateToDefault(festivalEndDate)}`;
  }

  if (eventDate) {
    return formatDateToDefault(eventDate);
  }

  return "";
};
