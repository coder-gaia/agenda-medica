import { createContext } from "react";

export type AuthContextType = {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);