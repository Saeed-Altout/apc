declare type IAccount = {
  id: number;
  balance: string;
  login: string;
  marginFree: string;
  timeCreated: string;
  timeUpdated: string;
  type: string;
};

declare type IAddAccountCredentials = {
  type: "trade" | "wallet";
};
