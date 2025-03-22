import { setCookie, deleteCookie, getCookie } from "cookies-next";

export class Cookie {
  private static instance: Cookie;
  private static readonly AUTH_TOKEN_KEY = "auth_token";

  private constructor() {}

  public static getInstance(): Cookie {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie();
    }
    return Cookie.instance;
  }

  public static setAccessToken(token: string) {
    setCookie(Cookie.AUTH_TOKEN_KEY, token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  public static async getAccessToken(): Promise<string | null> {
    return getCookie(Cookie.AUTH_TOKEN_KEY) as string | null;
  }

  public static async removeAccessToken() {
    deleteCookie(Cookie.AUTH_TOKEN_KEY, { path: "/" });
  }
}
