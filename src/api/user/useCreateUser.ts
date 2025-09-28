import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { getApiUrl } from "../utils";

import type { AxiosError } from "axios";
import type { CreateUserRequest, UserProfile } from "../../common/types/userTypes";

const createUser = async (userData: CreateUserRequest): Promise<UserProfile> => {
  const response = await axios.post(getApiUrl("/user"), userData);

  return response.data;
};

export const useCreateUser = (options?: {
  onSuccess?: (data: UserProfile) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}) => {
  return useMutation<UserProfile, AxiosError<{ message: string }>, CreateUserRequest>({
    mutationFn: createUser,
    ...options,
  });
};
