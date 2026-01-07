import { useMutation } from "@tanstack/react-query";

import apiClient from "../apiClient";

const deleteEvent = async (slug: string): Promise<boolean> => {
  const response = await apiClient.delete(`/events/${slug}`);

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
