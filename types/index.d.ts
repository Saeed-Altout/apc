declare type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

declare type RequestSmsTokenCredentialsType = { phoneNumber: string };
declare type VerifySmsTokenCredentialsType = {
  phoneNumber: string;
  token: string;
};
declare type WhatsappProviderCredentialsType = { token: string };
