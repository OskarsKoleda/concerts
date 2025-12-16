import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { ServerEventData } from "../../common/types/eventTypes";

const getEventDetails = async (slug: string): Promise<ServerEventData> => {
  const { data } = await axios.get<ServerEventData>(getApiUrl(`/events/${slug}`));

  return data;
};

// TODO: why is this fetched twice when navigating from details to edit?
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
