import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { UserProfile } from "../../common/types/userTypes";

const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiClient.get("/users/me");

  return response.data;
};

export const useGetCurrentUser = () => {
  return useQuery<UserProfile, AxiosErrorResponse>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
