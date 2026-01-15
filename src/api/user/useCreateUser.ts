import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../apiClient";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { CreateUserRequest, UserProfile } from "../../common/types/userTypes";

const createUser = async (userData: CreateUserRequest): Promise<UserProfile> => {
  const response = await apiClient.post("/users", userData);

  return response.data;
};

export const useCreateUser = (options?: {
  onSuccess?: (data: UserProfile) => void;
  onError?: (error: AxiosErrorResponse) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, AxiosErrorResponse, CreateUserRequest>({
    mutationFn: createUser,
    ...options,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data);
      options?.onSuccess?.(data);
    },
  });
};
