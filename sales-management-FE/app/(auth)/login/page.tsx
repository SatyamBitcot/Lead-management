"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Define form schema using zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Define the form values type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

// Define user type
type User = {
  email: string;
  name?: string;
};

// Static credentials for testing
const STATIC_CREDENTIALS = [
  { email: "admin@example.com", password: "Admin123456", name: "Admin User" },
  { email: "user@example.com", password: "User12345", name: "Test User" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  // Load any registered users from localStorage on mount
  useEffect(() => {
    try {
      const registeredUser = localStorage.getItem("registeredUser");
      if (registeredUser) {
        const parsedUser = JSON.parse(registeredUser);
        setRegisteredUsers([parsedUser]);
      }
    } catch (error) {
      console.error("Error loading registered users:", error);
    }
  }, []);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check credentials against static list and registered users
      const staticUser = STATIC_CREDENTIALS.find(
        (cred) => cred.email === data.email && cred.password === data.password
      );

      // Check if the user is trying to login with registered user credentials
      // For registered users, we accept any password that meets validation
      // since we don't actually store passwords securely in this demo
      const isRegisteredUser = registeredUsers.some(
        (user) => user.email === data.email && data.password.length >= 8
      );

      if (staticUser || isRegisteredUser) {
        // Find user info to store
        const userToStore: User = {
          email: data.email,
        };

        // Add name if available
        if (staticUser && staticUser.name) {
          userToStore.name = staticUser.name;
        } else if (isRegisteredUser) {
          const regUser = registeredUsers.find(
            (user) => user.email === data.email
          );
          if (regUser) {
            userToStore.name = `${regUser.firstName} ${regUser.lastName}`;
          }
        }

        // Save authentication state in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userToStore));

        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });

        // Redirect to dashboard after successful login
        router.push("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Your email or password is incorrect. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
          <p className="font-semibold">Test Credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: Admin123456</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
