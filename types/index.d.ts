declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};

declare type IParams = Record<string, any>;
declare type IAccessToken = string;
declare type IRefreshToken = string;
declare type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
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
declare type IUserResponse = IAxiosResponse<any>;
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

declare type IUserItem = {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  timeCreated: Date;
  timeUpdated: Date;
  user: IUser;
};

declare type IUsersResponse = IAxiosResponse<{
  items: IUserItem[];
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
  avatar?: File;
  idCardFace?: File;
  idCardBack?: File;
  addressLine: string;
  city: string;
  country: string;
  state: string;
  addressProof?: File;
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
