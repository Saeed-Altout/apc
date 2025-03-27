import { apiClient } from "@/lib/api-client";

import { CookieService } from "@/services/token/cookie-service";

export const AuthService = {
  LOGIN: "/auth/login-admin",
  LOGOUT_ACCESS: "/auth/logout-access",
  LOGOUT_REFRESH: "/auth/logout-refresh",
  REFRESH: "/auth/refresh",

  login: async (data: ILoginCredentials): Promise<ILoginResponse> => {
    try {
      const response = await apiClient.post<ILoginResponse>(
        AuthService.LOGIN,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(AuthService.LOGOUT_ACCESS);
      await apiClient.post(AuthService.LOGOUT_REFRESH);
    } catch (error) {
      throw error;
    }
  },

  refresh: async (): Promise<IRefreshResponse> => {
    try {
      const refreshToken = CookieService.getRefreshToken();
      const response = await apiClient.post<IRefreshResponse>(
        AuthService.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
