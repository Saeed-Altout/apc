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
  withCredentials: true,
};

export const apiClient = axios.create(defaultConfig);

// Token refresh state management
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

// Process the queue of failed requests
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

// Helper function to handle token refresh
const refreshToken = async (): Promise<string> => {
  if (isRefreshing) {
    // If already refreshing, return a promise that resolves when refreshing is done
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
    // Use our AuthService to handle the refresh
    const response = await AuthService.refresh();
    const { access_token: newAccessToken } = response.data;

    // Process any queued requests
    processQueue(null, newAccessToken);
    isRefreshing = false;

    return newAccessToken;
  } catch (error) {
    processQueue(error as Error);
    isRefreshing = false;

    // Clear tokens on refresh failure
    StorageService.clear();

    // Redirect handled by the calling function
    throw error;
  }
};

// Request interceptor - Add auth token to all requests
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

// Response interceptor - Handle 401 errors with token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Don't retry refresh token endpoint failures
    const isRefreshEndpoint = originalRequest.url?.includes(
      AuthService.REFRESH
    );

    // Handle 401 errors (Unauthorized)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint
    ) {
      originalRequest._retry = true;

      try {
        // Get a new token
        const newToken = await refreshToken();

        // Update the failed request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Retry the request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the token clearing is handled in refreshToken function
        // Redirection will be handled by React components or auth hooks
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
