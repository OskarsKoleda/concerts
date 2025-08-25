import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { ServerEventData } from "../common/types/eventTypes";

const getEvents = async (): Promise<ServerEventData[]> => {
  const response = await axios.get<ServerEventData[]>("http://localhost:3000/events");

  return response.data;
};

export const useGetEvents = () => {
  const { data, isLoading, error, isError } = useQuery<ServerEventData[]>({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return {
    events: data ?? [],
    isLoading: isLoading,
    error: error,
    isError: isError,
  };
};
