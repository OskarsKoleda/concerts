import axios, { HttpStatusCode } from "axios";

import { queryClient } from "../components/AppProviders/appProviders";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      queryClient.setQueryData(["currentUser"], null);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
