"use client";

import { useState } from "react";
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
import { login } from "@/graphQl/auth-service";
import { handleGraphQLError, shouldFallbackToLocal } from "@/utils/api";
import { store } from "@/redux/store";
import { setUser } from "@/redux/slices/userSlice";

// Define form schema using zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Define the form values type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

// Static credentials for testing (keeping these for fallback when API is not available)
const STATIC_CREDENTIALS = [
  { email: "admin@example.com", password: "Admin123456", name: "Admin User" },
  { email: "user@example.com", password: "User12345", name: "Test User" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useLocalAuth, setUseLocalAuth] = useState<boolean>(false);

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
      if (useLocalAuth) {
        // Fallback to local authentication if GraphQL API is not available
        await handleLocalAuth(data);
      } else {
        // Use GraphQL authentication
        const response = await login(data.email, data.password);

        if (response.success && response.data?.login?.success) {
          toast({
            title: "Login successful",
            description:
              response.data.login.message ||
              "You have been logged in successfully.",
          });

          // Redirect to dashboard after successful login
          router.push("/");
        } else {
          throw new Error(
            response.data?.login?.message ||
              response.message ||
              "Invalid credentials"
          );
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Get user-friendly error message
      const errorMessage = handleGraphQLError(error);

      // If error suggests we should use local auth
      if (!useLocalAuth && shouldFallbackToLocal(error)) {
        setUseLocalAuth(true);
        try {
          await handleLocalAuth(data);
          return;
        } catch (localError) {
          // If local auth also fails, show error
          toast({
            variant: "destructive",
            title: "Login failed",
            description: errorMessage,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Local authentication handler (fallback)
  async function handleLocalAuth(data: LoginFormValues) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials against static list
    const staticUser = STATIC_CREDENTIALS.find(
      (cred) => cred.email === data.email && cred.password === data.password
    );

    if (staticUser) {
      // Create user object for Redux
      const userToStore = {
        email: data.email,
        firstName: staticUser.name.split(" ")[0],
        lastName: staticUser.name.split(" ")[1] || "",
        role: "USER",
        isActive: true,
        isTwoFactorEnabled: false,
      };

      // Store user in Redux
      store.dispatch(setUser(userToStore));

      // Save tokens to localStorage (using dummy tokens for local auth)
      localStorage.setItem("accessToken", "local-auth-dummy-token");
      localStorage.setItem("refreshToken", "local-auth-dummy-refresh-token");

      toast({
        title: "Login successful",
        description: "You have been logged in successfully (using local auth).",
      });

      // Redirect to dashboard after successful login
      router.push("/");
    } else {
      throw new Error("Invalid credentials");
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
                      placeholder="Enter Email"
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
                      placeholder="Enter Password"
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
