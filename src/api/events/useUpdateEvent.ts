import { useMutation } from "@tanstack/react-query";

import { composeEventFormData } from "../utils";
import apiClient from "../apiClient";

import type { LocalEventData, ServerEventData } from "../../common/types/eventTypes";

const updateEvent = async (
  slug: string,
  event: Partial<LocalEventData>,
): Promise<ServerEventData> => {
  const formData = composeEventFormData(event);
  const response = await apiClient.patch(`/events/${slug}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const useUpdateEvent = (options?: {
  onSuccess?: (data: ServerEventData) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<ServerEventData, Error, { slug: string; event: Partial<LocalEventData> }>({
    mutationFn: ({ slug, event }) => updateEvent(slug, event),
    ...options,
  });
};
