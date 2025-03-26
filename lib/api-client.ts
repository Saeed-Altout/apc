import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { AuthService } from "@/services/auth/auth-service";
import { useAuthStore } from "@/services/auth/auth-store";
import { cookieStore } from "@/utils/cookie";

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
let refreshSubscribers: Array<(token: string) => void> = [];

const addRefreshSubscriber = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

const processRefreshQueue = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const onRefreshFailure = (): void => {
  useAuthStore.getState().logout();
  isRefreshing = false;
  refreshSubscribers = [];

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

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
        // If already refreshing, queue this request
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await AuthService.refresh();
        const { accessToken: newToken } = useAuthStore.getState();

        if (newToken) {
          useAuthStore.getState().setAccessToken(newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          processRefreshQueue(newToken);
          isRefreshing = false;

          return apiClient(originalRequest);
        } else {
          throw new Error("No access token received during refresh");
        }
      } catch (refreshError) {
        onRefreshFailure();
        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (error.message === "Network Error") {
      console.error("Network error detected. Please check your connection.");
    }

    // Handle server errors
    if (error.response?.status && error.response.status >= 500) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    }

    return Promise.reject(error);
  }
);
