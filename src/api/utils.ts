import { LocalEventData } from "../common/types/eventTypes";

export const composeEventFormData = (event: Partial<LocalEventData>): FormData => {
  const formData = new FormData();

  Object.entries(event).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === "bands" && Array.isArray(value)) {
      formData.append("bands", value.join(","));
    } else if (key === "ticketPrice") {
      formData.append("ticketPrice", String(value));
    } else if (key === "image" && value instanceof FileList && value.length > 0) {
      formData.append("posterImage", value[0]);
    } else if (key !== "image") {
      formData.append(key, value as string);
    }
  });

  return formData;
};
