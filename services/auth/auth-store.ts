import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthService } from "./auth-service";

interface AuthStore {
  user: User | null;
  phoneNumber: string;
  step: "phone" | "code" | "whatsapp";
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setPhoneNumber: (phoneNumber: string) => void;
  setStep: (step: "phone" | "code" | "whatsapp") => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      phoneNumber: "",
      step: "phone",
      isLoading: false,
      isAuthenticated: false,

      // Actions
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setStep: (step) => set({ step }),
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => {
        AuthService.logout();
        set({
          user: null,
          isAuthenticated: false,
          step: "phone",
          phoneNumber: "",
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
