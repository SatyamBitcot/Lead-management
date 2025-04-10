"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/dashboard";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Get authentication state from Redux
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check if tokens exist in localStorage (required for API calls)
    const hasTokens = localStorage.getItem("accessToken") !== null;

    if (!isAuthenticated || !hasTokens) {
      // Redirect to login if not authenticated or no tokens
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router, isAuthenticated]);

  // Show loading state or dashboard based on authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // We'll conditionally render the dashboard only when authenticated
  return <Dashboard />;
}
