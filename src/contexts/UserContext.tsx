import { getUserBy } from "api/users";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import { User } from "types/user";

export interface IUserContext {
  user: User | null;
  loginUser: (user: User) => void;
  logout: () => void;
}

export const userContextDefault: IUserContext = {
  user: null,
  loginUser: () => {},
  logout: () => {},
};

export const UserContext = createContext<IUserContext>(userContextDefault);

export interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [state, setState] = useState({
    ...userContextDefault,
    loginUser: (user: User) => {
      setState((state) => ({ ...state, user }));
      localStorage.setItem("logged-user", user.id);
    },
    logout: () => {
      setState((state) => ({ ...state, user: null }));
      localStorage.removeItem("logged-user");
    },
  });
  useEffect(() => {
    (async () => {
      const loggedUserId = localStorage.getItem("logged-user") || "";
      const user: User | null = await getUserBy("id", loggedUserId);
      if (user) state.loginUser(user);
    })();
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
