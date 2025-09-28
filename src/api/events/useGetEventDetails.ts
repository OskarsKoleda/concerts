import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { ServerEventData } from "../../common/types/eventTypes";

const getEventDetails = async (slug: string): Promise<ServerEventData> => {
  const response = await axios.get<ServerEventData>(getApiUrl(`/events/${slug}`));

  return response.data;
};

export const useGetEventDetails = (slug: string | undefined) => {
  const { data, isLoading, isError } = useQuery<ServerEventData>({
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
