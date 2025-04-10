"use client";

import { clientMutation } from "./apollo-client";
import { LOGIN, LOGOUT, REGISTER, VALIDATE_TOKEN } from "./auth-queries";
import {
  showLoginSuccessToast,
  showRegisterSuccessToast,
  showLogoutSuccessToast,
  handleGraphQLErrorWithToast,
} from "@/utils/auth-interceptor";
import { store } from "@/redux/store";
import { setUser, clearUser } from "@/redux/slices/userSlice";

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
      // Save tokens to localStorage only
      const { accessToken, refreshToken, user } = response.data.login;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Store user data in Redux
      if (user) {
        // Dispatch to Redux store
        store.dispatch(setUser(user));

        // Show success toast
        showLoginSuccessToast(user);
      }
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
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear user from Redux
      store.dispatch(clearUser());

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
