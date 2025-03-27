import { useMutation } from "@tanstack/react-query";

import { AuthService } from "@/services/auth/auth-service";
import { StorageService } from "@/services/token/storage-service";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginCredentials) => AuthService.login(data),
    onSuccess: (response) => {
      const { access_token } = response.data;
      StorageService.setAccessToken(access_token);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      StorageService.clear();
    },
  });
};

export const useRefresh = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: () => AuthService.refresh(),
    onSuccess: (response) => {
      const { access_token, refresh_token } = response.data;
      StorageService.setTokens(access_token, refresh_token);
    },
    onError: () => {
      StorageService.clear();
    },
  });
};
