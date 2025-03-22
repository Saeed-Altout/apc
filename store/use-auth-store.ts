import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthService } from "@/services/auth";

interface AuthState {
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

  // API methods
  submitPhoneNumber: (phoneNumber: string) => Promise<void>;
  submitVerificationCode: (code: string) => Promise<void>;
  whatsappAuth: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      // API methods
      submitPhoneNumber: async (phoneNumber) => {
        try {
          set({ isLoading: true, phoneNumber });
          await AuthService.requestSmsToken(phoneNumber);
          set({ step: "code", isLoading: false });
        } catch (error) {
          console.error("Error submitting phone number:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      submitVerificationCode: async (code) => {
        try {
          const { phoneNumber } = get();
          set({ isLoading: true });

          const response = await AuthService.verifySmsToken(phoneNumber, code);

          if (response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              step: "phone", // Reset step for next login
              isLoading: false,
            });
          } else {
            // If no user data but successful verification, move to WhatsApp auth
            set({ step: "whatsapp", isLoading: false });
          }
        } catch (error) {
          console.error("Error submitting verification code:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      whatsappAuth: async (token) => {
        try {
          set({ isLoading: true });

          const response = await AuthService.whatsappAuth(token);

          if (response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              step: "phone", // Reset step for next login
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Error with WhatsApp authentication:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        AuthService.logout();
        set({
          user: null,
          isAuthenticated: false,
          step: "phone",
          phoneNumber: "",
        });
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          // Here we would typically make a request to validate the token
          // and get the current user data
          const isAuthenticated = AuthService.isAuthenticated();

          if (isAuthenticated) {
            // Fetch user data - this is a placeholder, you'll need to implement
            // an actual API endpoint to get user data
            // const response = await api.get('/api/auth/me');
            // set({ user: response.data.user, isAuthenticated: true });
            set({ isAuthenticated: true });
            return true;
          } else {
            set({ user: null, isAuthenticated: false });
            return false;
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          set({ user: null, isAuthenticated: false, isLoading: false });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
