import { apiClient } from "@/lib/api-client";
import { Cookie } from "@/utils/cookie";
import { LocaleStorage } from "@/utils/local-storage";

export class AuthService {
  private static instance: AuthService;
  private static readonly REQUEST_SMS_TOKEN_URL = "/auth/request-sms-token";
  private static readonly VERIFY_SMS_TOKEN_URL = "/auth/verify-sms-token";

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public static async requestSmsToken(phoneNumber: string) {
    return apiClient.post(AuthService.REQUEST_SMS_TOKEN_URL, { phoneNumber });
  }

  public static async verifySmsToken(phoneNumber: string, code: string) {
    const response = await apiClient.post(AuthService.VERIFY_SMS_TOKEN_URL, {
      phoneNumber,
      code,
    });

    if (response.data.token) {
      LocaleStorage.setAccessToken(response.data.token);
      Cookie.setAccessToken(response.data.token);
    }

    return response;
  }

  public static async whatsappAuth(token: string) {
    const response = await apiClient.post("/api/auth/whatsapp-auth", { token });

    if (response.data.token) {
      LocaleStorage.setAccessToken(response.data.token);
      Cookie.setAccessToken(response.data.token);
    }

    return response;
  }

  public static async logout() {
    if (typeof window !== "undefined") {
      LocaleStorage.removeAccessToken();
      Cookie.removeAccessToken();
    }
  }

  public static isAuthenticated() {
    if (typeof window !== "undefined") {
      return !!LocaleStorage.getAccessToken();
    }
    return false;
  }
}
