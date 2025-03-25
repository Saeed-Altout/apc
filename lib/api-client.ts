import axios, { AxiosRequestConfig, AxiosError } from "axios";
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
    // Get token from cookie store instead of directly accessing localStorage
    const token = cookieStore.getAccessToken();

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

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use the auth store's refresh token mechanism
        const response = await axios.post(
          `${defaultConfig.baseURL}/auth/refresh`,
          { refreshToken: cookieStore.getRefreshToken() }
        );

        const { access_token } = response.data.data;

        if (access_token) {
          // Update token in cookie store
          cookieStore.setAccessToken(access_token);

          // Update Authorization header for the retried request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          // Retry the original request with the new token
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Clear auth data and redirect to login
        cookieStore.removeAccessToken();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors with more detailed message
    if (error.message === "Network Error") {
      console.error("Network error detected. Please check your connection.");
    }

    return Promise.reject(error);
  }
);
