import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { cookieStore } from "@/utils/cookie";

interface AuthStore {
  user: User | null;
  accessToken: AccessToken | null;
  refreshToken: RefreshToken | null;

  setUser: (user: User | null) => void;
  logout: () => void;
  login: (accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),

      login: (accessToken) => {
        if (accessToken) {
          set({ accessToken });
          cookieStore.setAccessToken(accessToken);
        }
      },

      setAccessToken: (accessToken) => {
        if (accessToken) {
          set({ accessToken });
          cookieStore.setAccessToken(accessToken);
        }
      },

      logout: () => {
        set({ accessToken: null, user: null });
        cookieStore.removeAccessToken();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
