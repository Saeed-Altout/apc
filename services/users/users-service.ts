import { apiClient } from "@/lib/api-client";

export const UsersService = {
  ROOT: "/users",
  UPLOAD_ID_CARD: "/upload/id-cards",
  GET_USER_PERSONAL_INFORMATION: "/personal-information",
  BLOCK_USER: "/block",
  UPDATE_PASSWORD: "/password",

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

      const res = await apiClient.post(UsersService.ROOT, formData, {
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

      if (data.phonenumber) formData.append("phonenumber", data.phonenumber);
      if (data.firstname) formData.append("firstname", data.firstname);
      if (data.lastname) formData.append("lastname", data.lastname);
      if (data.email) formData.append("email", data.email);
      if (data.roleId) formData.append("roleId", data.roleId);
      if (data.addressLine) formData.append("addressLine", data.addressLine);
      if (data.city) formData.append("city", data.city);
      if (data.country) formData.append("country", data.country);
      if (data.state) formData.append("state", data.state);

      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.idCardFace) formData.append("idCardFace", data.idCardFace);
      if (data.idCardBack) formData.append("idCardBack", data.idCardBack);
      if (data.addressProof) formData.append("addressProof", data.addressProof);

      const res = await apiClient.put(UsersService.ROOT + "/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<IUserResponse> => {
    try {
      const res = await apiClient.delete(UsersService.ROOT + "/" + id);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteMultipleUsers: async (userIds: string[]): Promise<IUserResponse> => {
    try {
      const res = await apiClient.delete(UsersService.ROOT, {
        data: { userIds },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  blockUser: async (id: string): Promise<IAxiosResponse<any>> => {
    try {
      const res = await apiClient.patch(
        UsersService.ROOT + UsersService.BLOCK_USER + "/" + id
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  blockMultipleUsers: async (userIds: string[]): Promise<IUserResponse> => {
    try {
      const res = await apiClient.patch(
        UsersService.ROOT + UsersService.BLOCK_USER,
        { userIds }
      );
      return res.data;
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
};
