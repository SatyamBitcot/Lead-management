"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
  ApolloError,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getApiUrl } from "./api";
import { toast } from "@/hooks/use-toast";

// Create auth Apollo client with interceptors
export const createAuthClient = () => {
  // Get auth token from localStorage (client-side only)
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken") || "";
  }

  // Auth header middleware
  const authMiddleware = new ApolloLink((operation, forward) => {
    // Add auth headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        "x-tz": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }));

    return forward(operation);
  });

  // Error handling link
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          // Handle auth errors
          if (
            err.extensions?.code === "UNAUTHENTICATED" ||
            err.message.toLowerCase().includes("unauthorized") ||
            err.message.toLowerCase().includes("token expired")
          ) {
            // Clear auth data from localStorage
            if (typeof window !== "undefined") {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("user");
              localStorage.removeItem("isAuthenticated");

              // Show error toast
              toast({
                title: "Session Expired",
                description: "Your session has expired. Please log in again.",
                variant: "destructive",
              });

              // Redirect to login page
              window.location.href = "/login";
            }
          }
        }
      }

      if (networkError) {
        toast({
          title: "Network Error",
          description:
            "Unable to connect to the server. Please check your connection.",
          variant: "destructive",
        });
      }
    }
  );

  // HTTP link
  const httpLink = new HttpLink({
    uri: getApiUrl(),
  });

  // Create and return the Apollo client
  return new ApolloClient({
    link: from([authMiddleware, errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  });
};

// Success toast notification for login
export const showLoginSuccessToast = (user: any) => {
  toast({
    title: "Login Successful",
    description: `Welcome back, ${user?.firstName || "User"}!`,
    variant: "success",
  });
};

// Success toast notification for registration
export const showRegisterSuccessToast = () => {
  toast({
    title: "Registration Successful",
    description: "Your account has been created successfully.",
    variant: "success",
  });
};

// Success toast notification for logout
export const showLogoutSuccessToast = () => {
  toast({
    title: "Logout Successful",
    description: "You have been successfully logged out.",
    variant: "success",
  });
};

// Helper to handle common GraphQL errors with toast
export const handleGraphQLErrorWithToast = (
  error: ApolloError | Error
): string => {
  let errorMessage = "An unknown error occurred";

  if (error instanceof ApolloError) {
    if (error.networkError) {
      errorMessage = "Network error - Please check your connection";
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
    } else if (error.graphQLErrors?.length > 0) {
      errorMessage = error.graphQLErrors[0].message;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  return errorMessage;
};
