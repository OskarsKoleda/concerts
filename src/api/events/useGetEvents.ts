import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { ServerEventData } from "../../common/types/eventTypes";
import type { EventFilters } from "../types";

const getEvents = async (filters: EventFilters): Promise<ServerEventData[]> => {
  const response = await axios.get<ServerEventData[]>(getApiUrl("/events"), {
    params: filters,
  });

  return response.data;
};

export const useGetEvents = (filters: EventFilters) => {
  const { data, isLoading, error, isError } = useQuery<ServerEventData[]>({
    queryKey: ["events", filters],
    queryFn: () => getEvents(filters),
  });

  return {
    events: data ?? [],
    isLoading,
    error,
    isError,
  };
};
