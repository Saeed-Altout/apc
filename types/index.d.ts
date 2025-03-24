declare type IAxiosResponse<T> = {
  data: T;
  message: string | null;
};

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
  access_token: string;
  personalInformation: null;
}>;

declare type RequestSmsTokenCredentialsType = {
  phoneNumber: string | null;
  email: string | null;
  password: string;
};
declare type WhatsappProviderCredentialsType = { token: string };
declare type VerifySmsTokenCredentialsType = {
  phoneNumber: string;
  token: string;
};
