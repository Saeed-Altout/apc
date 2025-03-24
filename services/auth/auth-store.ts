import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { cookieStore } from "@/utils/cookie";
import { localStorageStore } from "@/utils/local-storage";

interface AuthStore {
  user: User | null;
  accessToken: AccessToken | null;

  setUser: (user: User | null) => void;
  logout: () => void;
  login: (accessToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setUser: (user) => set({ user }),
      login: (accessToken) => {
        if (accessToken) {
          set({ accessToken });
          localStorageStore.setAccessToken(accessToken);
          cookieStore.setAccessToken(accessToken);
        }
      },
      logout: () => {
        set({ accessToken: null, user: null });
        localStorageStore.removeAccessToken();
        cookieStore.removeAccessToken();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
