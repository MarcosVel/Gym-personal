import { createContext, ReactNode } from "react";
import { UserDTO } from "../dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "John Doe",
          email: "john@gmail.com",
          avatar: "john.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
