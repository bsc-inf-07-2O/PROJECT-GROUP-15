// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AUTH_STATE_KEY = "auth_state";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthenticationState = () => {
      // the auth_state => active | inactive
      const value = localStorage.getItem(AUTH_STATE_KEY) ?? "inactive";
      if (value === "inactive") navigate("/");
    };
    getAuthenticationState();
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_STATE_KEY, "active");
    navigate("/dashboard");
  };
  const logout = () => {
    localStorage.setItem(AUTH_STATE_KEY, "inactive");
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
