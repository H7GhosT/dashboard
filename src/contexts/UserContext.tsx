import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "react-query";

import { User } from "types/user";
import { getUserBy } from "api/users";

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
  const { data: user } = useQuery<User | null>(
    "logged-user",
    async () => {
      const loggedUserId = localStorage.getItem("logged-user") || "";
      const user: User | null = await getUserBy("id", loggedUserId);
      return user;
    },
    {
      onSuccess: (user) => {
        if (user) state.loginUser(user);
      },
    }
  );

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
