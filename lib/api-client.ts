import axios, { AxiosRequestConfig, AxiosError } from "axios";

import { AuthService } from "@/services/auth/auth-service";
import { CookieService } from "@/services/token/cookie-service";
import { StorageService } from "@/services/token/storage-service";

const defaultConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://apc-app.apcprime.com/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const skipRefreshEndpoints = [AuthService.LOGIN];

    const isSkipEndpoint = skipRefreshEndpoints.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isSkipEndpoint
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await AuthService.refresh();
        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          response.data;

        StorageService.setAccessToken(newAccessToken);
        StorageService.setRefreshToken(newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        isRefreshing = false;
        StorageService.clear();
        CookieService.clear();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
