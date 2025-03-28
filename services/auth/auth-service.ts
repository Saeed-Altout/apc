import { apiClient } from "@/lib/api-client";
import { StorageService } from "@/services/token/storage-service";

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

      const { access_token, refresh_token } = response.data.data;
      StorageService.setTokens(access_token, refresh_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(AuthService.LOGOUT_ACCESS);
    } catch (error) {
      console.error("Logout API error:", error);
      return Promise.resolve();
    }
  },

  refresh: async (): Promise<IRefreshResponse> => {
    try {
      const refreshToken = StorageService.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<IRefreshResponse>(
        AuthService.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { access_token, refresh_token } = response.data.data;
      StorageService.setTokens(access_token, refresh_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: (): boolean => {
    return StorageService.isAuthenticated();
  },
};
