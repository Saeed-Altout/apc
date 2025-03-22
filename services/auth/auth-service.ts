import { AxiosResponse } from "axios";

import { Cookie } from "@/utils/cookie";
import { apiClient } from "@/lib/api-client";
import { localeStorage } from "@/utils/local-storage";

interface AuthResponse {
  token?: string;
  [key: string]: any;
}

export const AuthService = {
  REQUEST_SMS_TOKEN_URL: "api/auth/request-sms-token",
  VERIFY_SMS_TOKEN_URL: "/auth/verify-sms-token",
  WHATSAPP_AUTH_URL: "/api/auth/whatsapp-auth",

  requestSmsToken: async (
    data: RequestSmsTokenCredentialsType
  ): Promise<AxiosResponse> => {
    try {
      return await apiClient.post(AuthService.REQUEST_SMS_TOKEN_URL, data);
    } catch (error) {
      console.error("Error requesting SMS token:", error);
      throw error;
    }
  },

  verifySmsToken: async (
    phoneNumber: string,
    code: string
  ): Promise<AxiosResponse<AuthResponse>> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AuthService.VERIFY_SMS_TOKEN_URL,
        {
          phoneNumber,
          code,
        }
      );

      AuthService.handleAuthToken(response.data);
      return response;
    } catch (error) {
      console.error("Error verifying SMS token:", error);
      throw error;
    }
  },

  whatsappAuth: async (token: string): Promise<AxiosResponse<AuthResponse>> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AuthService.WHATSAPP_AUTH_URL,
        { token }
      );

      AuthService.handleAuthToken(response.data);
      return response;
    } catch (error) {
      console.error("Error authenticating with WhatsApp:", error);
      throw error;
    }
  },

  handleAuthToken: (data: AuthResponse): void => {
    if (data.token) {
      localeStorage.setAccessToken(data.token);
      Cookie.setAccessToken(data.token);
    }
  },

  logout: async (): Promise<void> => {
    if (typeof window !== "undefined") {
      localeStorage.removeAccessToken();
      Cookie.removeAccessToken();
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return !!localeStorage.getAccessToken();
    }
    return false;
  },
};
