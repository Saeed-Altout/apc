import { apiClient } from "@/lib/api-client";

export const AccountsService = {
  ROOT: "/accounts",
  CREATE_ACCOUNT: "/requests/pending",

  getUserAccounts: async (id: string): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.get(`${AccountsService.ROOT}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  addAccount: async (
    id: string,
    credentials: IAddAccountCredentials
  ): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.post(
        `${AccountsService.CREATE_ACCOUNT}`,
        {
          data: credentials,
          userId: id,
        },
        { params: { operation: "CREATE_ACCOUNT" } }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
