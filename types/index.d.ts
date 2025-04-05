declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};

declare type IParams = Record<string, any>;
declare type IAccessToken = string;
declare type IRefreshToken = string;
declare type IUser = {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  timeCreated: string;
  timeUpdated: string;
  user: {
    id: number;
    phoneNumber: string;
    role: {
      id: number;
      name: string;
      timeCreated: string;
      timeUpdated: string;
    };
    status: string;
    telegramUsername: string;
  };
};

declare type ILoginCredentials = {
  phoneNumber: string | null;
  email: string | null;
  password: string;
};

declare type ILoginResponse = IAxiosResponse<{
  access_token: IAccessToken;
  personalInformation: null;
  refresh_token: IRefreshToken;
}>;

declare type IRefreshResponse = IAxiosResponse<{
  access_token: IAccessToken;
  personalInformation: null;
  refresh_token: IRefreshToken;
}>;

declare type IWhatsappProviderCredentials = { token: string };

declare type IUploadIdCardCredentials = {
  face: File;
  back: File;
};
declare type IUploadIdCardResponse = IAxiosResponse<any>;

declare type IUserPersonalInformationResponse = IAxiosResponse<any>;

declare type IPermissionResponse = {
  boolValue: boolean;
  permission: {
    action: string;
    entityType: {
      id: number;
      name: string;
    };
    id: number;
  };
};
declare type IUserObject = {
  avatar: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  timeCreated: string;
  timeUpdated: string;
  user: {
    id: number;
    inactiveReason: string;
    phoneNumber: string;
    status: string;
    telegramUsername: string;
    accountManager: {
      avatar: string;
      id: number;
      name: string;
      phoneNumber: string;
      timeCreated: string;
      timeUpdated: string;
    };
    address: {
      addressLine: string;
      addressProof: {
        id: number;
        link: string;
        timeCreated: string;
        timeUpdated: string;
      };
      city: string;
      country: string;
      id: number;
      state: string;
      timeCreated: string;
      timeUpdated: string;
    };
    idCardBack: {
      id: number;
      link: string;
      timeCreated: string;
      timeUpdated: string;
    };
    idCardFace: {
      id: number;
      link: string;
      timeCreated: string;
      timeUpdated: string;
    };
    role: {
      id: number;
      name: string;
      permissions: IPermissionResponse[];
      timeCreated: string;
      timeUpdated: string;
    };
  };
};

declare type IUserResponse = IAxiosResponse<IUserObject>;
declare type IRole = {
  id: number;
  name: string;
  timeCreated: Date;
  timeUpdated: Date;
};
declare type IUser = {
  id: number;
  phoneNumber: string;
  role: IRole;
  status: string;
  telegramUsername: string;
};

declare type IUsersResponse = IAxiosResponse<{
  items: IUser[];
  limit: number;
  nextNum: number;
  page: number;
  pages: number;
  prevNum: number;
  total: number;
}>;

declare type IAddUserCredentials = {
  phonenumber: string;
  firstname: string;
  lastname: string;
  email: string;
  roleId: string;
  addressLine: string;
  city: string;
  country: string;
  state: string;
  avatar?: File | null;
  idCardFace?: File | null;
  idCardBack?: File | null;
  addressProof?: File | null;
};
declare type IUpdateUserCredentials = {
  phonenumber: string;
  firstname: string;
  lastname: string;
  email: string;
  roleId: string;
  avatar?: File;
  idCardFace?: File;
  idCardBack?: File;
  addressLine: string;
  city: string;
  country: string;
  state: string;
  addressProof?: File;
};
declare type IUpdateUserPasswordCredentials = {
  currentPassword?: string;
  newPassword: string;
};
declare type IDeleteMultipleUsersCredentials = {
  usersIds: number[];
};
declare type IBlockMultipleUsersCredentials = {
  usersIds: number[];
};
