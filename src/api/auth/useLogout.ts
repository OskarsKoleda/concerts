import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { AxiosErrorResponse } from "../../common/types/appTypes";

const logout = async (): Promise<void> => {
  await axios.post(getApiUrl("/auth/logout"));
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
