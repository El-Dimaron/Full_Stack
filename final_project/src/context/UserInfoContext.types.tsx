export type UserInfo = {
  name: string;
  age: null | number;
  subscriptions: string[];
};

export type UserInfoContextType = {
  user: UserInfo;
  login: (user: UserInfo) => void;
  logout: () => void;
};
