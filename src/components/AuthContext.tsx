import React, { useState, useContext, ReactNode } from "react";

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  password: string;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const registeredUsers: User[] = [
  { id: "1", email: "akatsuka.kyoko@plus-zero.co.jp", password: "akatsuka" },
  { id: "2", email: "super-admin@plus-zero.co.jp", password: "super-admin" },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    } else {
      return false;
    }
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
