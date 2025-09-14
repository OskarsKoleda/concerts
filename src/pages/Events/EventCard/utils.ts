import { formatDateToDefault } from "../../../common/utils/utils";

export const formatEventDate = (eventDate: string, festivalEndDate?: string) => {
  if (festivalEndDate) {
    return `${formatDateToDefault(eventDate)} - ${formatDateToDefault(festivalEndDate)}`;
  }

  return formatDateToDefault(eventDate);
};
