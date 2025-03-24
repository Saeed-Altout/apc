import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth-service";
import { localStorageStore } from "@/utils/local-storage";
import { cookieStore } from "@/utils/cookie";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginCredentials) => AuthService.login(data),
    onSuccess(data) {
      const accessToken = data.data.access_token;
      if (accessToken) {
        localStorageStore.setAccessToken(accessToken);
        cookieStore.setAccessToken(accessToken);
      }
    },
  });
};

export const useRequestSmsTokenMutation = () => {
  return useMutation({
    mutationKey: ["request-sms-token"],
    mutationFn: (data: RequestSmsTokenCredentialsType) =>
      AuthService.requestSmsToken(data),
  });
};

export const useVerifySmsToken = () => {
  return useMutation({
    mutationKey: ["verify-sms-token"],
    mutationFn: (data: VerifySmsTokenCredentialsType) =>
      AuthService.verifySmsToken(data),
  });
};

export const useWhatsappProvider = () => {
  return useMutation({
    mutationKey: ["whatsapp-provider"],
    mutationFn: (data: WhatsappProviderCredentialsType) =>
      AuthService.whatsappProvider(data),
  });
};
