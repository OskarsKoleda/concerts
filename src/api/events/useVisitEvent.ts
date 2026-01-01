import { isAxiosError } from "axios";
import apiClient from "../apiClient";
import { HttpStatusCode } from "axios";
import { AxiosErrorResponse } from "../../common/types/appTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerEventData } from "../../common/types/eventTypes";

export const visitEvent = async (slug: string): Promise<boolean> => {
  try {
    const result = await apiClient.post(`/events/${slug}/visit`);

    if (result.status === HttpStatusCode.NoContent) {
      return true;
    }

    return false;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.error("Network error");
    }

    throw error;
  }
};

/**
 * Alternatively, invalidate the "events" query to trigger a refetch:
 * onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] })
 */
export const useVisitEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, AxiosErrorResponse, string>({
    mutationFn: visitEvent,
    onSuccess: (_data, slug) =>
      queryClient.setQueriesData(
        { queryKey: ["events"] },
        (oldEvents: ServerEventData[] | undefined) =>
          oldEvents?.map((event) => (event.slug === slug ? { ...event, isVisited: true } : event)),
      ),
  });
};
