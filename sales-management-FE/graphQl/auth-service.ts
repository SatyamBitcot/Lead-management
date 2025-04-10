"use client";

import { clientMutation } from "./apollo-client";
import { LOGIN, LOGOUT, REGISTER, VALIDATE_TOKEN } from "./auth-queries";
import {
  showLoginSuccessToast,
  showRegisterSuccessToast,
  showLogoutSuccessToast,
  handleGraphQLErrorWithToast,
} from "@/utils/auth-interceptor";

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
  try {
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
        // Show success toast
        showLoginSuccessToast(user);
      }

      localStorage.setItem("isAuthenticated", "true");
    }

    return response;
  } catch (error: any) {
    // Handle error with toast
    handleGraphQLErrorWithToast(error);
    return { success: false, message: error.message, loading: false };
  }
};

// Register function
export const register = async (userInput: CreateUserInput) => {
  try {
    const response = await clientMutation<{ createUser: User }>(REGISTER, {
      createUserInput: userInput,
    });

    if (response.success) {
      // Show success toast
      showRegisterSuccessToast();
    }

    return response;
  } catch (error: any) {
    // Handle error with toast
    handleGraphQLErrorWithToast(error);
    return { success: false, message: error.message, loading: false };
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await clientMutation<{ logout: boolean }>(LOGOUT, {});

    if (response.success) {
      // Clear auth data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");

      // Show success toast
      showLogoutSuccessToast();
    }

    return response;
  } catch (error: any) {
    // Handle error with toast
    handleGraphQLErrorWithToast(error);
    return { success: false, message: error.message, loading: false };
  }
};

// Validate token function
export const validateToken = async (token: string) => {
  try {
    const response = await clientMutation<{ validateToken: boolean }>(
      VALIDATE_TOKEN,
      {
        token,
      }
    );

    return response;
  } catch (error: any) {
    // Handle error with toast
    handleGraphQLErrorWithToast(error);
    return { success: false, message: error.message, loading: false };
  }
};
