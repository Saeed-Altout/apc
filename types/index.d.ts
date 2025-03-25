declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};

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
  personalInformation: null;
}>;

declare type IWhatsappProviderCredentials = { token: string };
