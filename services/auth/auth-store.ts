import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { cookieStore } from "@/utils/cookie";

interface AuthStore {
  user: User | null;
  accessToken: AccessToken | null;
  refreshToken: RefreshToken | null;

  setUser: (user: User | null) => void;
  logout: () => void;
  login: (accessToken: string, refreshToken?: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),
      login: (accessToken, refreshToken) => {
        if (accessToken) {
          set({ accessToken });
          cookieStore.setAccessToken(accessToken);
        }
        if (refreshToken) {
          set({ refreshToken });
          cookieStore.setRefreshToken(refreshToken);
        }
      },
      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
        cookieStore.removeAccessToken();
        cookieStore.removeRefreshToken();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
