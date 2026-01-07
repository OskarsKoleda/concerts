import { isAxiosError } from "axios";
import { HttpStatusCode } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { QueryKey } from "@tanstack/react-query";
import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { ServerEventData } from "../../common/types/eventTypes";

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

export const useVisitEvent = () => {
  const queryClient = useQueryClient();

  // useMutation<TData, TError, TVariables, TContext>
  return useMutation<
    boolean,
    AxiosErrorResponse,
    string,
    { previousEvents: [QueryKey, ServerEventData[] | undefined][] }
  >({
    mutationFn: visitEvent,
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });

      const previousEvents = queryClient.getQueriesData<ServerEventData[]>({
        queryKey: ["events"],
      });

      queryClient.setQueriesData<ServerEventData[]>({ queryKey: ["events"] }, (old) =>
        old?.map((event) => (event.slug === slug ? { ...event, isVisited: true } : event)),
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
