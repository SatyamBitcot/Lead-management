"use client";

import { clientMutation } from "./apollo-client";
import { LOGIN, LOGOUT, REGISTER, VALIDATE_TOKEN } from "./auth-queries";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  isTwoFactorEnabled: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  isTwoFactorEnabled?: boolean;
}

// Login function
export const login = async (username: string, password: string) => {
  const response = await clientMutation<{ login: AuthResponse }>(LOGIN, {
    username,
    password,
  });

  if (response.success && response.data?.login) {
    // Save tokens to localStorage
    const { accessToken, refreshToken, user } = response.data.login;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    localStorage.setItem("isAuthenticated", "true");
  }

  return response;
};

// Register function
export const register = async (userInput: CreateUserInput) => {
  const response = await clientMutation<{ createUser: User }>(REGISTER, {
    createUserInput: userInput,
  });

  return response;
};

// Logout function
export const logout = async () => {
  const response = await clientMutation<{ logout: boolean }>(LOGOUT, {});

  if (response.success) {
    // Clear auth data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  }

  return response;
};

// Validate token function
export const validateToken = async (token: string) => {
  const response = await clientMutation<{ validateToken: boolean }>(
    VALIDATE_TOKEN,
    {
      token,
    }
  );

  return response;
};
