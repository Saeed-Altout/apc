export const StorageService = {
  AUTH_ACCESS_TOKEN_KEY: "auth-access-token",
  AUTH_REFRESH_TOKEN_KEY: "auth-refresh-token",

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageService.AUTH_ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(StorageService.AUTH_REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageService.AUTH_ACCESS_TOKEN_KEY, token);
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(StorageService.AUTH_ACCESS_TOKEN_KEY);
    }
    return null;
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(StorageService.AUTH_ACCESS_TOKEN_KEY);
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageService.AUTH_REFRESH_TOKEN_KEY, token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(StorageService.AUTH_REFRESH_TOKEN_KEY);
    }
    return null;
  },

  removeRefreshToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(StorageService.AUTH_REFRESH_TOKEN_KEY);
    }
  },

  clear: (): void => {
    StorageService.removeAccessToken();
    StorageService.removeRefreshToken();
  },
};
