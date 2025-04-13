import { apiClient } from "@/lib/api-client";

export const UsersService = {
  EDIT_USER: "/users/admin",
  ADD_USER: "/users/admin",
  ROOT: "/users",
  UPLOAD_ID_CARD: "/upload/id-cards",
  GET_USER_PERSONAL_INFORMATION: "/personal-information",
  BLOCK_USER: "/block",
  UPDATE_PASSWORD: "/password",
  EXPORT: "/export",

  uploadIdCard: async (
    data: IUploadIdCardCredentials
  ): Promise<IUploadIdCardResponse> => {
    try {
      const res = await apiClient.post(UsersService.UPLOAD_ID_CARD, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getUserPersonalInformation:
    async (): Promise<IUserPersonalInformationResponse> => {
      try {
        const res = await apiClient.get(
          UsersService.ROOT + UsersService.GET_USER_PERSONAL_INFORMATION
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },

  getUserById: async (id: string): Promise<IUserResponse> => {
    try {
      const res = await apiClient.get(UsersService.ROOT + "/" + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getUsers: async ({
    params,
  }: {
    params: IParams;
  }): Promise<IUsersResponse> => {
    try {
      const res = await apiClient.get(UsersService.ROOT, { params });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  addUser: async (data: IAddUserCredentials): Promise<IUserResponse> => {
    try {
      const formData = new FormData();

      formData.append("phonenumber", data.phonenumber);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("roleId", data.roleId);
      formData.append("addressLine", data.addressLine);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("state", data.state);

      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.idCardFace) formData.append("idCardFace", data.idCardFace);
      if (data.idCardBack) formData.append("idCardBack", data.idCardBack);
      if (data.addressProof) formData.append("addressProof", data.addressProof);

      const res = await apiClient.post(UsersService.ADD_USER, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (
    id: string,
    data: IUpdateUserCredentials
  ): Promise<IUserResponse> => {
    try {
      const formData = new FormData();

      formData.append("phonenumber", data.phonenumber);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("roleId", data.roleId);
      formData.append("addressLine", data.addressLine);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("state", data.state);

      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.idCardFace) formData.append("idCardFace", data.idCardFace);
      if (data.idCardBack) formData.append("idCardBack", data.idCardBack);
      if (data.addressProof) formData.append("addressProof", data.addressProof);

      const res = await apiClient.put(UsersService.EDIT_USER + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(UsersService.ROOT + "/admin/" + id);
    } catch (error) {
      throw error;
    }
  },

  blockUser: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(UsersService.ROOT + "/admin/" + id);
    } catch (error) {
      throw error;
    }
  },

  deleteMultipleUsers: async (
    data: IDeleteMultipleUsersCredentials
  ): Promise<void> => {
    try {
      await apiClient.delete(UsersService.ROOT + "/admin/delete", {
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  blockMultipleUsers: async (
    data: IBlockMultipleUsersCredentials
  ): Promise<void> => {
    try {
      await apiClient.patch(UsersService.ROOT + "/admin/ban", {
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  updateUserPassword: async (
    id: string,
    data: IUpdateUserPasswordCredentials
  ): Promise<IUserResponse> => {
    try {
      const res = await apiClient.put(
        UsersService.ROOT + UsersService.UPDATE_PASSWORD + "/" + id,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  exportUsers: async (params?: IParams): Promise<Blob> => {
    try {
      const res = await apiClient.get(UsersService.ROOT + UsersService.EXPORT, {
        params,
        responseType: "blob",
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
