import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthService } from "@/services/auth/auth-service";
import { StorageService } from "@/services/token/storage-service";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthService.isAuthenticated()
  );

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
    const checkInterval = setInterval(() => {
      const currentAuthState = AuthService.isAuthenticated();
      setIsAuthenticated(currentAuthState);

      if (!currentAuthState && window.location.pathname !== "/login") {
        router.push("/login");
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, [router]);

  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginCredentials) =>
      AuthService.login(credentials),
    onSuccess: () => {
      setError(null);
      setIsAuthenticated(true);

      // queryClient.invalidateQueries({ queryKey: ["auth"] });
      // queryClient.invalidateQueries({ queryKey: ["user"] });

      router.push("/");
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message ||
        (err instanceof Error
          ? err.message
          : "Authentication failed. Please check your credentials.");
      setError(errorMessage);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onMutate: () => {
      StorageService.clear();
      setIsAuthenticated(false);

      queryClient.resetQueries();
    },
    onSuccess: () => {
      router.push("/login");
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["auth"] });
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.clear();
    },
  });

  const refreshMutation = useMutation({
    mutationFn: () => AuthService.refresh(),
    onSuccess: () => {
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      StorageService.clear();
      setIsAuthenticated(false);
      router.push("/login");
    },
  });

  const login = async (credentials: ILoginCredentials): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync(credentials);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refresh = async (): Promise<boolean> => {
    try {
      await refreshMutation.mutateAsync();
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isPublicPath = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ].some((path) => currentPath.startsWith(path));

    if (!isAuthenticated && !isPublicPath) {
      router.push("/login");
    } else if (isAuthenticated && currentPath === "/login") {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return {
    login,
    logout,
    refresh,
    error,
    isLoading:
      loginMutation.isPending ||
      logoutMutation.isPending ||
      refreshMutation.isPending,
    isAuthenticated,
  };
};
