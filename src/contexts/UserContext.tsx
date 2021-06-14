import React, { createContext, ReactNode, useState } from "react";

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
    },
    logout: () => {
      setState((state) => ({ ...state, user: null }));
    },
  });
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
