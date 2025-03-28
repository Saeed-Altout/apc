export const StorageService = {
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem(StorageService.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(StorageService.REFRESH_TOKEN_KEY, refreshToken);
  },
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(StorageService.ACCESS_TOKEN_KEY);
  },
  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(StorageService.ACCESS_TOKEN_KEY, token);
  },
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(StorageService.REFRESH_TOKEN_KEY);
  },
  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(StorageService.REFRESH_TOKEN_KEY, token);
  },
  clear: (): void => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(StorageService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(StorageService.REFRESH_TOKEN_KEY);
  },
  isAuthenticated: (): boolean => {
    return !!StorageService.getAccessToken();
  },
};
