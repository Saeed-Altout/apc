declare type IUploadIdCardCredentials = {
  face: File;
  back: File;
};

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
  avatar: {
    id: number;
    link: string;
    timeCreated: string;
    timeUpdated: string | null;
  };
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  timeCreated: string;
  timeUpdated: string | null;
  user: {
    accountManager: {
      avatar: string;
      id: number;
      name: string;
      phoneNumber: string;
      timeCreated: string;
      timeUpdated: string | null;
    };
    address: {
      addressLine: string;
      addressProof: {
        id: number;
        link: string;
        timeCreated: string;
        timeUpdated: string | null;
      };
      city: string;
      country: string;
      id: number;
      state: string;
      timeCreated: string;
      timeUpdated: string | null;
    };
    id: number;
    idCardBack: {
      id: number;
      link: string;
      timeCreated: string;
      timeUpdated: string | null;
    };
    idCardFace: {
      id: number;
      link: string;
      timeCreated: string;
      timeUpdated: string | null;
    };
    inactiveReason: string | null;
    phoneNumber: string;
    role: {
      id: number;
      name: string;
      timeCreated: string;
      timeUpdated: string | null;
    };
    status: string;
    telegramUsername: string | null;
  };
};

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
  phonenumber?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  roleId?: string;
  avatar?: File;
  idCardFace?: File;
  idCardBack?: File;
  addressLine?: string;
  city?: string;
  country?: string;
  state?: string;
  addressProof?: File;
};
declare type IUpdateUserPasswordCredentials = {
  currentPassword?: string;
  newPassword: string;
};
declare type IDeleteMultipleUsersCredentials = { usersIds: number[] };
declare type IBlockMultipleUsersCredentials = { usersIds: number[] };
declare type IUserResponse = IAxiosResponse<IUserObject>;
declare type IUploadIdCardResponse = IAxiosResponse<any>;
declare type IUserPersonalInformationResponse = IAxiosResponse<any>;
declare type IUsersResponse = IAxiosResponse<{
  items: IUser[];
  limit: number;
  nextNum: number;
  page: number;
  pages: number;
  prevNum: number;
  total: number;
}>;
