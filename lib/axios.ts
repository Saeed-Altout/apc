import axios from "axios";
import { LocaleStorage } from "@/utils/local-storage";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://apc-app.apcprime.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? LocaleStorage.getAccessToken() : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Clear auth state
      if (typeof window !== "undefined") {
        LocaleStorage.removeAccessToken();
        // Redirect to login page if needed
        // window.location.href = '/login';
      }
    }

    if (response?.status >= 500) {
      console.error("Server error occurred:", error);
    }

    return Promise.reject(error);
  }
);

export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  retry: 1,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
};

export const defaultMutationOptions = {
  retry: 0,
  onError: (error: any) => {
    console.error("Mutation error:", error);
    // You could trigger a toast notification here
  },
};

export { axiosInstance };
