import { AxiosResponse } from "axios";

import { apiClient } from "@/lib/api-client";
import { cookieManager } from "@/utils/cookie";
import { localStorageManager } from "@/utils/local-storage";

interface AuthResponse {
  token?: string;
  [key: string]: any;
}

export const AuthService = {
  REQUEST_SMS_TOKEN_URL: "/auth/request-sms-token",
  VERIFY_SMS_TOKEN_URL: "/auth/verify-sms-token",
  WHATSAPP_AUTH_URL: "/auth/whatsapp-auth",

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
    data: VerifySmsTokenCredentialsType
  ): Promise<AxiosResponse<AuthResponse>> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AuthService.VERIFY_SMS_TOKEN_URL,
        data
      );

      AuthService.handleAuthToken(response.data);
      return response;
    } catch (error) {
      console.error("Error verifying SMS token:", error);
      throw error;
    }
  },

  whatsappProvider: async (
    data: WhatsappProviderCredentialsType
  ): Promise<AxiosResponse<AuthResponse>> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AuthService.WHATSAPP_AUTH_URL,
        data
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
      localStorageManager.setAccessToken(data.token);
      cookieManager.setAccessToken(data.token);
    }
  },

  logout: async (): Promise<void> => {
    if (typeof window !== "undefined") {
      localStorageManager.clear();
      cookieManager.clear();
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return !!localStorageManager.getAccessToken();
    }
    return false;
  },
};
