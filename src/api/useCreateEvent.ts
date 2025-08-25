import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import type { LocalEventData, ServerEventData } from "../common/types/eventTypes";
import { composeEventFormData } from "./utils";

const createEvent = async (event: LocalEventData): Promise<ServerEventData> => {
  const formData = composeEventFormData(event);
  const response = await axios.post("http://localhost:3000/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const useCreateEvent = (options?: {
  onSuccess?: (data: ServerEventData) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<ServerEventData, Error, LocalEventData>({
    mutationFn: createEvent,
    ...options,
  });
};
