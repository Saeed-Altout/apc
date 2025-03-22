import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthService } from "@/services/auth/auth-service";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: AuthService.isAuthenticated(),

      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
