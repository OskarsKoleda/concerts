import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { UserProfile } from "../../common/types/userTypes";

const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await axios.get(getApiUrl("/user/me"));

  return response.data;
};

export const useGetCurrentUser = () => {
  return useQuery<UserProfile, AxiosErrorResponse>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
