import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName?: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: { firstName: string; lastName: string; role: string }) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Optional: Implement API login here
    throw new Error('Not implemented');
  };

  const register = async (email: string, password: string, userData: { firstName: string; lastName: string; role: string }) => {
    const newUser = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: `${userData.firstName} ${userData.lastName}`,
      name: `${userData.firstName} ${userData.lastName}`,
      role: userData.role
    };
    setUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'admin');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string) => {
    console.log('Password reset requested for:', email);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      user,
      currentUser,
      setCurrentUser,
      login,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
