import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import { AuthService } from "@/services/auth/auth-service";
import { StorageService } from "@/services/token/storage-service";

const defaultConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://apc-app.apcprime.com/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    DeviceType: "admin",
  },
};

export const apiClient = axios.create(defaultConfig);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      if (token && request.config.headers) {
        request.config.headers.Authorization = `Bearer ${token}`;
      }
      request.resolve(apiClient(request.config));
    }
  });
  failedQueue = [];
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await AuthService.refresh();

    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      response.data;

    // Store the new tokens
    StorageService.setAccessToken(newAccessToken);
    if (newRefreshToken) {
      StorageService.setRefreshToken(newRefreshToken);
    }

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = StorageService.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshEndpoint = originalRequest.url?.includes(
      AuthService.REFRESH
    );

    // Check if the error is due to an expired token (401) and not already retrying
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // If a refresh is already in progress, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        if (!newToken) {
          // If refresh failed, clear tokens and redirect to login
          StorageService.clear();
          isRefreshing = false;
          processQueue(new Error("Token refresh failed"), null);

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(new Error("Authentication failed"));
        }

        // Update the authorization header with the new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Process any requests that were queued during the refresh
        processQueue(null, newToken);

        isRefreshing = false;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        StorageService.clear();
        processQueue(refreshError as Error, null);

        // Only redirect if in browser environment
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
