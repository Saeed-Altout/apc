declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};
declare type IApiObj<T> = {
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

declare type IDevice = {
  deviceId: string;
  deviceName: string;
  id: number;
  isActive: boolean;
  is_main: boolean;
  timeCreated: string;
  timeUpdated: string;
};

declare type IRole = {
  id: number;
  name: string;
  permissions: {
    boolValue: boolean;
    permission: {
      action: string;
      entityType: {
        id: number;
        name: string;
      };
      id: number;
    };
  }[];
  timeCreated: string;
  timeUpdated: string | null;
};

declare type ILoginWithWhatsappCredentials = {
  token: string;
};

declare type ILoginWithWhatsappResponse = IAxiosResponse<{
  access_token: IAccessToken;
  refresh_token: IRefreshToken;
}>;
