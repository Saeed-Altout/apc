declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};

declare type IParams = Record<string, any>;
declare type AccessToken = string;
declare type RefreshToken = string;
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
  access_token: AccessToken;
  refresh_token?: RefreshToken;
  personalInformation: null;
}>;

declare type IWhatsappProviderCredentials = { token: string };

declare type IUploadIdCardCredentials = {
  face: File;
  back: File;
};
declare type IUploadIdCardResponse = IAxiosResponse<any>;

declare type IUserPersonalInformationResponse = IAxiosResponse<any>;
declare type IUserResponse = IAxiosResponse<any>;
declare type IUsersResponse = IAxiosResponse<any>;
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
