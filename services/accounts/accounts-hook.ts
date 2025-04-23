import { useQuery } from "@tanstack/react-query";
import { AccountsService } from "./accounts-service";

export const useGetUserAccounts = (id: string) => {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => AccountsService.getUserAccounts(id),
  });
};
