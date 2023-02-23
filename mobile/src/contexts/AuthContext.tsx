import { createContext } from "react";
import { UserDTO } from "../dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
