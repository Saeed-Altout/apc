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

const refreshToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (value) => resolve(value as string),
        reject,
        config: {} as AxiosRequestConfig,
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await AuthService.refresh();
    const { access_token: newAccessToken } = response.data;

    processQueue(null, newAccessToken);
    isRefreshing = false;

    return newAccessToken;
  } catch (error) {
    processQueue(error as Error);
    isRefreshing = false;
    StorageService.clear();
    throw error;
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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
