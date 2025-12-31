import { useMutation } from "@tanstack/react-query";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { AuthenticateUserRequest, UserProfile } from "../../common/types/userTypes";
import apiClient from "../apiClient";
import axios from "axios";

export const login = async (userData: AuthenticateUserRequest): Promise<UserProfile> => {
  try {
    const response = await apiClient.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
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
