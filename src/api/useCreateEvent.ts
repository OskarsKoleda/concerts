import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { composeEventFormData } from "./utils";

import type { LocalEventData, ServerEventData } from "../common/types/eventTypes";

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
