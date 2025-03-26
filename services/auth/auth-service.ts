import { apiClient } from "@/lib/api-client";

export const AuthService = {
  LOGIN: "/auth/login-admin",
  LOGOUT_ACCESS: "/auth/logout-access",
  LOGOUT_REFRESH: "/auth/logout-refresh",
  REFRESH: "/auth/refresh",

  login: async (data: ILoginCredentials): Promise<ILoginResponse> => {
    try {
      const res = await apiClient.post<ILoginResponse>(AuthService.LOGIN, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await Promise.all([
        apiClient.post(AuthService.LOGOUT_ACCESS),
        apiClient.post(AuthService.LOGOUT_REFRESH),
      ]);
    } catch (error) {
      throw error;
    }
  },

  refresh: async (): Promise<void> => {
    try {
      const res = await apiClient.post(AuthService.REFRESH);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
