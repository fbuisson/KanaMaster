"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "../utils/apiClient";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  role: "user" | "admin" | null;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await apiClient.post("/auth/refresh-token", {}, { withCredentials: true });
        const response = await apiClient.get("/auth/me");
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserId(response.data.data._id);
          setRole(response.data.data.role);
        }
      } catch (error) {
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, role, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
