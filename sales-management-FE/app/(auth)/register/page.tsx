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
import { register as registerUser } from "@/graphQl/auth-service";
import { CreateUserInput } from "@/graphQl/auth-service";
import { handleGraphQLError, shouldFallbackToLocal } from "@/utils/api";

// Define form schema using zod
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the form values type from the schema
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useLocalRegistration, setUseLocalRegistration] =
    useState<boolean>(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handler
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);

    try {
      if (useLocalRegistration) {
        // Fallback to local registration if GraphQL API is not available
        await handleLocalRegistration(data);
      } else {
        // Use GraphQL registration
        const userInput: CreateUserInput = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          // Default values for optional fields
          isTwoFactorEnabled: false,
          role: "SMALL_BUSINESS", // Default role
        };

        const response = await registerUser(userInput);
        debugger;
        if (response.success && response.data?.createUser) {
          toast({
            title: "Registration successful",
            description: "Your account has been created successfully.",
          });

          // Redirect to login page after successful registration
          router.push("/login");
        } else {
          throw new Error(response.message || "Registration failed");
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // Get user-friendly error message
      const errorMessage = handleGraphQLError(error);

      // If error suggests we should use local registration
      if (!useLocalRegistration && shouldFallbackToLocal(error)) {
        setUseLocalRegistration(true);
        try {
          await handleLocalRegistration(data);
          return;
        } catch (localError) {
          // If local registration also fails, show error
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: errorMessage,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Local registration handler (fallback)
  async function handleLocalRegistration(data: RegisterFormValues) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For static authentication, we'll just simulate registration success
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        // Don't store plain text password even in demo
      })
    );

    toast({
      title: "Registration successful",
      description:
        "Your account has been created successfully (using local storage).",
    });

    // Redirect to login page after successful registration
    router.push("/login");
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      autoComplete="new-password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center text-gray-500 w-full">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
