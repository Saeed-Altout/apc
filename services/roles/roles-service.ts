import { apiClient } from "@/lib/api-client";

export const RolesService = {
  GET_ROLES: "/roles",

  getRoles: async (): Promise<IAxiosResponse<IRole[]>> => {
    try {
      const res = await apiClient.get(RolesService.GET_ROLES);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
