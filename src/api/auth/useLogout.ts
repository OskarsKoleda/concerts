import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { AxiosErrorResponse } from "../../common/types/appTypes";

const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosErrorResponse, void>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
