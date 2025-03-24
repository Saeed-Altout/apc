import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { localStorageStore } from "@/utils/local-storage";
import { cookieStore } from "@/utils/cookie";

const defaultConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://apc-app.apcprime.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(defaultConfig);

apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorageStore.getAccessToken() : null;

    if (token) {
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
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window !== "undefined") {
        const refreshToken = localStorageStore.getRefreshToken();

        if (refreshToken) {
          try {
            originalRequest._retry = true;

            const response = await axios.post(
              `${defaultConfig.baseURL}/auth/refresh`,
              { refreshToken }
            );

            const { token } = response.data;

            localStorageStore.setAccessToken(token);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }

            return apiClient(originalRequest);
          } catch (refreshError) {
            localStorageStore.clear();
            cookieStore.clear();
            //TODO: queryClient.clear()
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }

            return Promise.reject(refreshError);
          }
        }
      }
    }

    if (error.message === "Network Error") {
      console.error("Network error detected. Please check your connection.");
    }

    return Promise.reject(error);
  }
);
