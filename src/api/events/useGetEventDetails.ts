import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { ServerEventData } from "../../common/types/eventTypes";

const getEventDetails = async (slug: string): Promise<ServerEventData> => {
  const { data } = await apiClient.get<ServerEventData>(`/events/${slug}`);

  return data;
};

// TODO: check why is this fetched twice when navigating from details to edit?
export const useGetEventDetails = (slug: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eventDetails", slug],
    queryFn: () => getEventDetails(slug!),
    enabled: !!slug,
  });

  return {
    eventData: data,
    isLoading,
    isError,
  };
};
