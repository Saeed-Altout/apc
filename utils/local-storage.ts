export const localStorageManager = {
  AUTH_ACCESS_TOKEN_KEY: "auth-access-token",
  AUTH_REFRESH_TOKEN_KEY: "auth-refresh-token",

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorage.AUTH_ACCESS_TOKEN_KEY, token);
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(localStorage.AUTH_ACCESS_TOKEN_KEY);
    }
    return null;
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(localStorage.AUTH_ACCESS_TOKEN_KEY);
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorage.AUTH_REFRESH_TOKEN_KEY, token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(localStorage.AUTH_REFRESH_TOKEN_KEY);
    }
    return null;
  },

  removeRefreshToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(localStorage.AUTH_REFRESH_TOKEN_KEY);
    }
  },

  clear: (): void => {
    localStorageManager.removeAccessToken();
    localStorageManager.removeRefreshToken();
  },
};
