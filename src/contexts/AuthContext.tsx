"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Society } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  society: Society | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data store - in real app, this would be a database
interface MockDataStore {
  users: User[];
  societies: Society[];
  societyApplications: unknown[];
}

export const mockDataStore: MockDataStore = {
  users: [
    {
      id: "admin-1",
      email: "admin@coopkonnect.com",
      firstName: "Admin",
      lastName: "User",
      phone: "+234-800-000-0000",
      role: UserRole.COOPKONNECT_ADMIN,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "society-1",
      email: "president@teacherscoop.com",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "+234-801-111-2222",
      role: UserRole.SOCIETY_PRESIDENT,
      societyId: "demo-society-1",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  societies: [
    {
      id: "demo-society-1",
      name: "Lagos Teachers Cooperative Society",
      description: "A cooperative society for educators in Lagos State",
      address: "123 Education Avenue, Lagos",
      phone: "+234-801-234-5678",
      email: "info@teacherscoop.com",
      bankAccount: {
        bankName: "First Bank",
        accountNumber: "1234567890",
        accountName: "Lagos Teachers Cooperative Society"
      },
      isActive: true,
      interestRate: 2.5,
      loanTermMonths: 12,
      minimumMembershipMonths: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  societyApplications: []
};

// Mock password store (in real app, passwords would be hashed)
export const mockPasswords: Record<string, string> = {
  "admin@coopkonnect.com": "admin123",
  "president@teacherscoop.com": "society123"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [society, setSociety] = useState<Society | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on load
    const savedUser = localStorage.getItem('coopkonnect_user');
    const savedSociety = localStorage.getItem('coopkonnect_society');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedSociety) {
      setSociety(JSON.parse(savedSociety));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists and password is correct
      console.log('🔍 Login attempt for:', email);
      console.log('👥 Available users:', mockDataStore.users.map(u => ({ email: u.email, role: u.role })));
      console.log('🔑 Available passwords:', Object.keys(mockPasswords));

      const foundUser = mockDataStore.users.find(u => u.email === email);
      if (!foundUser) {
        console.log('❌ User not found:', email);
        return { success: false, error: "User not found" };
      }

      if (mockPasswords[email] !== password) {
        return { success: false, error: "Invalid password" };
      }

      if (!foundUser.isActive) {
        return { success: false, error: "Account is not active" };
      }

      // Set user and society if applicable
      setUser(foundUser);
      localStorage.setItem('coopkonnect_user', JSON.stringify(foundUser));

      if (foundUser.societyId) {
        const userSociety = mockDataStore.societies.find(s => s.id === foundUser.societyId);
        if (userSociety) {
          setSociety(userSociety);
          localStorage.setItem('coopkonnect_society', JSON.stringify(userSociety));
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setSociety(null);
    localStorage.removeItem('coopkonnect_user');
    localStorage.removeItem('coopkonnect_society');
  };

  return (
    <AuthContext.Provider value={{ user, society, login, logout, isLoading }}>
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

// Export mock data store for other components to use
export { mockDataStore, mockPasswords };
