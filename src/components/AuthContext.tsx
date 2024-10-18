import React, { useState, useContext, ReactNode } from "react";

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string) => {
    setCurrentUser({ id: "1", email });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
