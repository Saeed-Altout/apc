import { useMutation } from "@tanstack/react-query";

import { AuthService } from "@/services/auth/auth-service";
import { useAuthStore } from "@/services/auth/auth-store";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginCredentials) => AuthService.login(data),
    onSuccess(data) {
      const accessToken = data.data.access_token;
      if (accessToken) {
        login(accessToken);
      }
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      logout();
    },
  });
};

export const useRefresh = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: () => AuthService.refresh(),
  });
};
