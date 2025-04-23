import { apiClient } from "@/lib/api-client";

export const AccountsService = {
  ROOT: "/accounts",

  getUserAccounts: async (id: string): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.get(`${AccountsService.ROOT}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
