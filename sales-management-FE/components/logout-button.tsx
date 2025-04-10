"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

type User = {
  email: string;
  name?: string;
} | null;

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Get user info from localStorage on client side
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    // Show success toast
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="flex items-center">
      {user && (
        <span className="text-sm text-gray-600 mr-2">
          {user.name || user.email}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </Button>
    </div>
  );
}
