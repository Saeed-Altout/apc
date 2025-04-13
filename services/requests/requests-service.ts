import { apiClient } from "@/lib/api-client";
import { RequestFormValues } from "@/schemas/request";
import { IRequestResponse, IRequestsResponse } from "@/types/request";

export interface IParams {
  [key: string]: string | number | boolean | undefined;
}

export const RequestsService = {
  ROOT: "/requests",
  APPROVE: "/approve",
  REJECT: "/reject",
  EXPORT: "/export",

  getRequests: async ({
    params,
  }: {
    params: IParams;
  }): Promise<IRequestsResponse> => {
    try {
      const res = await apiClient.get(RequestsService.ROOT, { params });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getRequestById: async (id: string): Promise<IRequestResponse> => {
    try {
      const res = await apiClient.get(RequestsService.ROOT + "/" + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  addRequest: async (data: RequestFormValues): Promise<IRequestResponse> => {
    try {
      const res = await apiClient.post(RequestsService.ROOT, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  updateRequest: async (
    id: string,
    data: RequestFormValues
  ): Promise<IRequestResponse> => {
    try {
      const res = await apiClient.put(RequestsService.ROOT + "/" + id, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  approveRequest: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(
        RequestsService.ROOT + RequestsService.APPROVE + "/" + id
      );
    } catch (error) {
      throw error;
    }
  },

  rejectRequest: async (id: string, rejectionReason: string): Promise<void> => {
    try {
      await apiClient.patch(
        RequestsService.ROOT + RequestsService.REJECT + "/" + id,
        { rejectionReason }
      );
    } catch (error) {
      throw error;
    }
  },

  exportRequests: async (params?: IParams): Promise<Blob> => {
    try {
      const res = await apiClient.get(
        RequestsService.ROOT + RequestsService.EXPORT,
        {
          params,
          responseType: "blob",
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
