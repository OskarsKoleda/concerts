import { HttpStatusCode, isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { QueryKey } from "@tanstack/react-query";
import type { ServerEventData } from "../../common/types/eventTypes";
import type { AxiosErrorResponse } from "../../common/types/appTypes";

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

  return useMutation<
    boolean,
    AxiosErrorResponse,
    string,
    { previousEvents: [QueryKey, ServerEventData[] | undefined][] }
  >({
    mutationFn: unvisitEvent,
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });

      const previousEvents = queryClient.getQueriesData<ServerEventData[]>({
        queryKey: ["events"],
      });

      queryClient.setQueriesData<ServerEventData[]>(
        {
          queryKey: ["events"],
        },
        (oldEvents) =>
          oldEvents?.map((event) => (event.slug === slug ? { ...event, isVisited: false } : event)),
      );

      return { previousEvents };
    },
    onError: (_err, _slug, context) => {
      if (context?.previousEvents) {
        context.previousEvents.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
