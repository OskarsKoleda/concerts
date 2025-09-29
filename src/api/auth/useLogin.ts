import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { AxiosErrorResponse } from "../../common/types/appTypes";
import type { AuthenticateUserRequest, UserProfile } from "../../common/types/userTypes";

const login = async (userData: AuthenticateUserRequest): Promise<UserProfile> => {
  const response = await axios.post(getApiUrl("/auth/login"), userData);

  return response.data;
};

export const useLogin = (options: {
  onSuccess?: (data: UserProfile) => void;
  onError?: (error: AxiosErrorResponse) => void;
}) => {
  return useMutation<UserProfile, AxiosErrorResponse, AuthenticateUserRequest>({
    mutationFn: login,
    ...options,
  });
};
