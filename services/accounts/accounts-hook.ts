import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AccountsService } from "./accounts-service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useModal } from "@/hooks/use-modal";

export const useGetUserAccounts = (id: string) => {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => AccountsService.getUserAccounts(id),
    enabled: !!id,
  });
};

export const useAddAccountMutation = (id: string) => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();

  return useMutation({
    mutationKey: ["add-account", id],
    mutationFn: (credentials: IAddAccountCredentials) =>
      AccountsService.addAccount(id, credentials),
    onSuccess: (data) => {
      invalidateAccounts(queryClient, id);
      toast.success(data.message || "Account added successfully");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to add account");
      }
    },
  });
};

const invalidateAccounts = (queryClient: QueryClient, id: string) => {
  queryClient.invalidateQueries({ queryKey: ["accounts", id] });
};
