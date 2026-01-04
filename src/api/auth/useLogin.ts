import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import apiClient from "../apiClient";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { AuthenticateUserRequest, UserProfile } from "../../common/types/userTypes";

export const login = async (userData: AuthenticateUserRequest): Promise<UserProfile> => {
  try {
    const response = await apiClient.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.error("Network error");
    }

    throw error;
  }
};

export const useLogin = (options?: {
  onSuccess?: (data: UserProfile) => void;
  onError?: (error: AxiosErrorResponse) => void;
}) => {
  return useMutation<UserProfile, AxiosErrorResponse, AuthenticateUserRequest>({
    mutationFn: login,
    ...options,
  });
};
