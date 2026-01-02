import { HttpStatusCode, isAxiosError } from "axios";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosErrorResponse } from "../../common/types/appTypes";
import { ServerEventData } from "../../common/types/eventTypes";

export const unvisitEvent = async (slug: string): Promise<boolean> => {
  try {
    const result = await apiClient.delete(`/events/${slug}/visit`);

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

export const useUnvisitEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, AxiosErrorResponse, string>({
    mutationFn: unvisitEvent,
    onSuccess: (_data, slug) => {
      queryClient.setQueriesData(
        { queryKey: ["events"] },
        (oldEvents: ServerEventData[] | undefined) =>
          oldEvents?.map((event) => (event.slug === slug ? { ...event, isVisited: false } : event)),
      );
      queryClient.setQueriesData(
        { queryKey: ["eventDetails", slug] },
        (oldEvent: ServerEventData | undefined) =>
          oldEvent ? { ...oldEvent, isVisited: false } : oldEvent,
      );
    },
  });
};
