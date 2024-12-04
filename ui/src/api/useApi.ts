import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Logger from "../lib/logger";

type Maybe<T> = T | undefined;

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Handle unauthorized errors
      if (status === 401) {
        Logger.error("Unauthorized: Token might be expired or invalid.");
        localStorage.removeItem("accessToken");
        window.location.href = "/"; // Replace with your login route
      }

      Logger.error(
        `API Error: ${error.response.data.message || error.message}`
      );
    } else {
      Logger.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

interface UseApiResponse<T> {
  data: Maybe<T>;
  error: string;
  hasError: boolean;
  isLoading: boolean;
}

export const useApi = <T>(
  axios: () => Promise<AxiosResponse<T>>
): UseApiResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Maybe<T>>();

  useEffect(() => {
    setIsLoading(true);
    axios()
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    data,
    error,
    hasError,
  };
};
