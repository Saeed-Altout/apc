import { setCookie, deleteCookie, getCookie } from "cookies-next";

export const cookieManager = {
  AUTH_TOKEN_KEY: "auth-token-key",

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      setCookie(cookieManager.AUTH_TOKEN_KEY, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return getCookie(cookieManager.AUTH_TOKEN_KEY) as string | null;
    }
    return null;
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      deleteCookie(cookieManager.AUTH_TOKEN_KEY, { path: "/" });
    }
  },

  clear: (): void => {
    cookieManager.removeAccessToken();
  },
};
