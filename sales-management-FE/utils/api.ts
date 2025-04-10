"use client";

// Get the GraphQL endpoint URL from env or use a default
export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8000/graphql";
};

// Function to handle common GraphQL errors
export const handleGraphQLError = (error: any): string => {
  if (error?.message?.includes("Network Error")) {
    return "Network error - Please check your connection or the server might be down";
  }

  if (error?.message?.includes("Failed to fetch")) {
    return "Failed to connect to the server - Please try again later";
  }

  return error?.message || "An unknown error occurred";
};

// Determine if we should fall back to local auth based on the error
export const shouldFallbackToLocal = (error: any): boolean => {
  if (!error) return false;

  const errorMessage = error.message?.toLowerCase() || "";
  return (
    errorMessage.includes("network") ||
    errorMessage.includes("failed to fetch") ||
    errorMessage.includes("connection") ||
    errorMessage.includes("timeout")
  );
};
