import { setCookie, deleteCookie, getCookie } from "cookies-next";

export const cookieStore = {
  AUTH_ACCESS_TOKEN_KEY: "access_token",
  AUTH_REFRESH_TOKEN_KEY: "refresh_token",

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      setCookie(cookieStore.AUTH_ACCESS_TOKEN_KEY, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return getCookie(cookieStore.AUTH_ACCESS_TOKEN_KEY) as string | null;
    }
    return null;
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      deleteCookie(cookieStore.AUTH_ACCESS_TOKEN_KEY, { path: "/" });
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      setCookie(cookieStore.AUTH_REFRESH_TOKEN_KEY, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return getCookie(cookieStore.AUTH_REFRESH_TOKEN_KEY) as string | null;
    }
    return null;
  },

  removeRefreshToken: (): void => {
    if (typeof window !== "undefined") {
      deleteCookie(cookieStore.AUTH_REFRESH_TOKEN_KEY, { path: "/" });
    }
  },

  clear: (): void => {
    cookieStore.removeAccessToken();
    cookieStore.removeRefreshToken();
  },
};
