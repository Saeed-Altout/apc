import { apiClient } from "@/lib/api-client";

export const AuthService = {
  LOGIN: "/auth/login-admin",
  LOGOUT: "/auth/logout-access",

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
      const res = await apiClient.post(AuthService.LOGOUT);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
