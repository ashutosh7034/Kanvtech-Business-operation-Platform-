import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  department: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const CEO_PROFILE: UserProfile = {
  name: 'Rajesh Verma',
  email: 'ceo@demo.com',
  role: 'ceo',
  title: 'Chief Executive Officer',
  avatar: 'RV',
  department: 'Executive Leadership',
};

const HR_PROFILE: UserProfile = {
  name: 'Priya Nair',
  email: 'hr@demo.com',
  role: 'hr',
  title: 'Head of People & Workforce Operations',
  avatar: 'PN',
  department: 'Human Resources',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with CEO logged in by default for instantaneous review, or allow login
  const [user, setUser] = useState<UserProfile | null>(CEO_PROFILE);

  const login = (email: string, rolePreference?: UserRole): boolean => {
    const normalized = email.toLowerCase().trim();
    if (normalized.includes('hr') || rolePreference === 'hr') {
      setUser(HR_PROFILE);
      return true;
    } else if (normalized.includes('ceo') || rolePreference === 'ceo' || normalized.includes('rajesh')) {
      setUser(CEO_PROFILE);
      return true;
    } else {
      // Default to CEO profile for general demo
      setUser(CEO_PROFILE);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'ceo') {
      setUser(CEO_PROFILE);
    } else {
      setUser(HR_PROFILE);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
