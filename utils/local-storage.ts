export class LocaleStorage {
  private static instance: LocaleStorage;
  private static readonly TOKEN_KEY = "token";

  private constructor() {}

  public static getInstance(): LocaleStorage {
    if (!LocaleStorage.instance) {
      LocaleStorage.instance = new LocaleStorage();
    }
    return LocaleStorage.instance;
  }

  public static setAccessToken(token: string) {
    localStorage.setItem(LocaleStorage.TOKEN_KEY, token);
  }

  public static getAccessToken(): string | null {
    return localStorage.getItem(LocaleStorage.TOKEN_KEY);
  }

  public static removeAccessToken() {
    localStorage.removeItem(LocaleStorage.TOKEN_KEY);
  }
}
