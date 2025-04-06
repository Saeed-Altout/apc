import { apiClient } from "@/lib/api-client";

export const DevicesService = {
  ROOT: "/user-devices",

  // TODO: Update response type
  setMain: async (id: string): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.put(`${DevicesService.ROOT}/${id}/set-main`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.delete(`${DevicesService.ROOT}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  accept: async (id: string): Promise<IApiObj<null>> => {
    try {
      const res = await apiClient.put(`${DevicesService.ROOT}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (): Promise<IApiObj<IDevice[]>> => {
    try {
      const res = await apiClient.get(DevicesService.ROOT);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getAllById: async (id: string): Promise<IApiObj<IDevice[]>> => {
    try {
      const res = await apiClient.get(`${DevicesService.ROOT}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
