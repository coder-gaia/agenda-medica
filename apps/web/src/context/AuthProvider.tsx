import { useState } from "react";
import { AuthContext } from "./AuthContext";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated") === "true";
  });

  function login() {
    localStorage.setItem("authenticated", "true");
    setAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}