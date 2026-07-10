import { createContext } from "react";
import { type UserInfo, type UserInfoContextType } from "./UserInfoContext.types";

export const guestUser: UserInfo = {
  name: "nobody",
  age: null,
  subscriptions: [],
};

export const UserInfoContext = createContext<UserInfoContextType>({
  user: guestUser,
  login: () => {},
  logout: () => {},
});
