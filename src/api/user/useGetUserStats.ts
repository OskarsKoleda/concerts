import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { UserStats } from "../../common/types/userTypes";

const getUserStats = async (): Promise<UserStats> => {
  const response = await apiClient.get("/users/me/stats");

  return response.data;
};

export const useGetUserStats = () => {
  return useQuery<UserStats>({
    queryKey: ["userStats"],
    queryFn: getUserStats,
  });
};
