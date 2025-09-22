import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  plan: 'free' | 'premium';
  awsCredentials?: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePlan: (plan: 'free' | 'premium') => void;
  updateAWSCredentials: (credentials: User['awsCredentials']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ml-finops-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication
    const mockUser: User = {
      id: '1',
      email,
      plan: 'free'
    };
    setUser(mockUser);
    localStorage.setItem('ml-finops-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ml-finops-user');
  };

  const updatePlan = (plan: 'free' | 'premium') => {
    if (user) {
      const updatedUser = { ...user, plan };
      setUser(updatedUser);
      localStorage.setItem('ml-finops-user', JSON.stringify(updatedUser));
    }
  };

  const updateAWSCredentials = (credentials: User['awsCredentials']) => {
    if (user) {
      const updatedUser = { ...user, awsCredentials: credentials };
      setUser(updatedUser);
      localStorage.setItem('ml-finops-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updatePlan,
      updateAWSCredentials
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}