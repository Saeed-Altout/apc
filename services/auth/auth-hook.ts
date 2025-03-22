import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./auth-store";
import { AuthService } from "./auth-service";

import { toast } from "sonner";

export const useRequestSmsTokenMutation = () => {
  return useMutation({
    mutationFn: (data: RequestSmsTokenCredentialsType) =>
      AuthService.requestSmsToken(data),
    onSuccess: () => {
      toast.success("SMS sent successfully");
    },
    onError: () => {
      toast.error("Failed to send SMS");
    },
  });
};

export const useVerifySmsToken = () => {
  const queryClient = useQueryClient();
  const { phoneNumber, setIsLoading, setUser, setIsAuthenticated, setStep } =
    useAuthStore((state) => ({
      phoneNumber: state.phoneNumber,
      setIsLoading: state.setIsLoading,
      setUser: state.setUser,
      setIsAuthenticated: state.setIsAuthenticated,
      setStep: state.setStep,
    }));

  return useMutation({
    mutationFn: (code: string) => AuthService.verifySmsToken(phoneNumber, code),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setStep("phone"); // Reset step for next login
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        // If no user data but successful verification, move to WhatsApp auth
        setStep("whatsapp");
      }
    },
    onError: (error) => {
      console.error("Error submitting verification code:", error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};

export const useWhatsappAuth = () => {
  const queryClient = useQueryClient();
  const { setIsLoading, setUser, setIsAuthenticated, setStep } = useAuthStore(
    (state) => ({
      setIsLoading: state.setIsLoading,
      setUser: state.setUser,
      setIsAuthenticated: state.setIsAuthenticated,
      setStep: state.setStep,
    })
  );

  return useMutation({
    mutationFn: (token: string) => AuthService.whatsappAuth(token),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setStep("phone"); // Reset step for next login
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error) => {
      console.error("Error with WhatsApp authentication:", error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};

export const useCheckAuth = () => {
  const { setIsLoading, setUser, setIsAuthenticated } = useAuthStore(
    (state) => ({
      setIsLoading: state.setIsLoading,
      setUser: state.setUser,
      setIsAuthenticated: state.setIsAuthenticated,
    })
  );

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      setIsLoading(true);
      try {
        const isAuthenticated = AuthService.isAuthenticated();

        if (isAuthenticated) {
          // Here you would typically fetch user data
          // const response = await api.get('/api/auth/me');
          // setUser(response.data.user);
          setIsAuthenticated(true);
          return true;
        } else {
          setUser(null);
          setIsAuthenticated(false);
          return false;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
        setIsAuthenticated(false);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    refetchOnWindowFocus: false,
  });
};
