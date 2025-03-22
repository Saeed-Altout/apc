import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth-service";

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
