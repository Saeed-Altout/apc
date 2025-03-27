import { setCookie, deleteCookie, getCookie } from "cookies-next";

import {
  MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN,
} from "@/config/constants";

export const CookieService = {
  AUTH_ACCESS_TOKEN_KEY: "CWS-NEXT-ACCESS-TOKEN",
  AUTH_REFRESH_TOKEN_KEY: "CWS-NEXT-REFRESH-TOKEN",

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      setCookie(CookieService.AUTH_ACCESS_TOKEN_KEY, token, {
        maxAge: MAX_AGE_ACCESS_TOKEN,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return getCookie(CookieService.AUTH_ACCESS_TOKEN_KEY) as string | null;
    }
    return null;
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      deleteCookie(CookieService.AUTH_ACCESS_TOKEN_KEY, { path: "/" });
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      setCookie(CookieService.AUTH_REFRESH_TOKEN_KEY, token, {
        maxAge: MAX_AGE_REFRESH_TOKEN,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return getCookie(CookieService.AUTH_REFRESH_TOKEN_KEY) as string | null;
    }
    return null;
  },

  removeRefreshToken: (): void => {
    if (typeof window !== "undefined") {
      deleteCookie(CookieService.AUTH_REFRESH_TOKEN_KEY, { path: "/" });
    }
  },

  clear: (): void => {
    CookieService.removeAccessToken();
    CookieService.removeRefreshToken();
  },
};
