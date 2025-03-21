import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { queryClient } from "./react-query/config";

// Default config
const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create an axios instance
export const apiClient = axios.create(defaultConfig);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from local storage or wherever it's stored
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Try token refresh if we have a refresh mechanism
      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refresh-token");

        if (refreshToken) {
          try {
            originalRequest._retry = true;

            // Call your refresh token endpoint
            const response = await axios.post(
              `${defaultConfig.baseURL}/auth/refresh`,
              { refreshToken }
            );

            const { token } = response.data;

            // Update token in storage
            localStorage.setItem("auth-token", token);

            // Update header for the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }

            // Retry the original request
            return apiClient(originalRequest);
          } catch (refreshError) {
            // If refresh fails, logout the user
            localStorage.removeItem("auth-token");
            localStorage.removeItem("refresh-token");

            // Clear all React Query caches
            queryClient.clear();

            // Redirect to login page
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }

            return Promise.reject(refreshError);
          }
        }
      }
    }

    // Handle network errors
    if (error.message === "Network Error") {
      console.error("Network error detected. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Generic GET request
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient
      .get<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data),

  // Generic POST request
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient
      .post<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data),

  // Generic PUT request
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient
      .put<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data),

  // Generic PATCH request
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient
      .patch<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data),

  // Generic DELETE request
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient
      .delete<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data),
};

// Resource factory
export const createResource = <T>(endpoint: string) => {
  return {
    // Get all items
    getAll: (params?: Record<string, any>) =>
      api.get<T[]>(endpoint, { params }),

    // Get paginated items
    getPaginated: (page = 1, limit = 10, params?: Record<string, any>) =>
      api.get<{ data: T[]; total: number; page: number; limit: number }>(
        endpoint,
        { params: { page, limit, ...params } }
      ),

    // Get a single item by ID
    getById: (id: string | number) => api.get<T>(`${endpoint}/${id}`),

    // Create a new item
    create: (data: Partial<T>) => api.post<T>(endpoint, data),

    // Update an item
    update: (id: string | number, data: Partial<T>) =>
      api.patch<T>(`${endpoint}/${id}`, data),

    // Replace an item
    replace: (id: string | number, data: T) =>
      api.put<T>(`${endpoint}/${id}`, data),

    // Delete an item
    delete: (id: string | number) => api.delete<void>(`${endpoint}/${id}`),

    // Custom actions
    custom: (
      path: string,
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
      data?: any
    ) => {
      const url = `${endpoint}/${path}`;
      switch (method) {
        case "GET":
          return api.get(url, { params: data });
        case "POST":
          return api.post(url, data);
        case "PUT":
          return api.put(url, data);
        case "PATCH":
          return api.patch(url, data);
        case "DELETE":
          return api.delete(url);
      }
    },
  };
};
