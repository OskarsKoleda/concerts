import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

const deleteEvent = async (slug: string) => {
  const response = await axios.delete(getApiUrl(`/events/${slug}`));

  if (response.status === 204) {
    return true;
  }

  return false;
};

export const useDeleteEvent = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<boolean, Error, string>({
    mutationFn: deleteEvent,
    ...options,
  });
};
