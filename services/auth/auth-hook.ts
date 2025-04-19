import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthService } from "@/services/auth/auth-service";
import { StorageService } from "@/services/token/storage-service";
import { AUTH_DEFAULT_REDIRECT } from "@/config/constants";

export const useLoginWithWhatsapp = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login-with-whatsapp"],
    mutationFn: (data: ILoginWithWhatsappCredentials) =>
      AuthService.loginWithWhatsapp(data),
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data;
      StorageService.setTokens(access_token, refresh_token);
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Login failed", {
          description: error.response?.data.message,
        });
      }
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginCredentials) => AuthService.login(data),
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data;
      StorageService.setTokens(access_token, refresh_token);
      toast.success("Login successful");
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Login failed", {
          description: error.response?.data.message,
        });
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      StorageService.clear();
      router.push(AUTH_DEFAULT_REDIRECT);
      toast.success("Logout successful");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Logout failed", {
          description: error.response?.data.message,
        });
      }
    },
  });
};

export const useRefresh = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: () => AuthService.refresh(),
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data;
      StorageService.setTokens(access_token, refresh_token);
    },
  });
};
