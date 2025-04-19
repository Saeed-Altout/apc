"use client";
import * as React from "react";

import { AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_DEFAULT_REDIRECT } from "@/config/constants";
const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100)
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a number" })
      .describe("Password"),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .describe("Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (!emailParam) {
      setError("Invalid password reset link. Email is missing.");
      return;
    }

    if (!tokenParam && process.env.NODE_ENV === "production") {
      setError(
        "Invalid or expired password reset link. Please request a new one."
      );
      return;
    }

    setEmail(emailParam);
  }, [searchParams]);

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: NewPasswordFormValues) => {
    console.log(values);
  };

  const handleBackToLogin = () => {
    router.push(AUTH_DEFAULT_REDIRECT);
  };

  const hasCapitalLetter = form.watch("password")?.match(/[A-Z]/);
  const hasLowerCaseLetter = form.watch("password")?.match(/[a-z]/);
  const hasNumber = form.watch("password")?.match(/[0-9]/);
  const hasLength = form.watch("password")?.length >= 8;

  if (error) {
    return (
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#0f766d] text-white p-2 rounded-md">
              <span className="text-2xl font-bold">APC</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">PRIME</div>
          </div>
        </div>

        <div className="text-center mb-2">
          <p className="text-xs text-gray-500">Admin Dashboard</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Password Reset Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-red-50 border-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800 font-semibold">
                Error
              </AlertTitle>
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
              <Button
                onClick={handleBackToLogin}
                className="mt-4 w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
              >
                Back to Login
              </Button>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-[#0f766d] text-white p-2 rounded-md">
            <span className="text-2xl font-bold">APC</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">PRIME</div>
        </div>
      </div>

      <div className="text-center mb-2">
        <p className="text-xs text-gray-500">Admin Dashboard</p>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            {email
              ? `Create a new password for ${email}`
              : "Create a new password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {form.formState.isSubmitted ? (
            <Alert className="bg-green-50 border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-semibold">
                Password Reset Successful
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Your password has been successfully reset. You can now log in
                with your new password.
              </AlertDescription>
              <Button
                onClick={handleBackToLogin}
                className="mt-4 w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
              >
                Go to Login
              </Button>
            </Alert>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
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
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Password must:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={!!hasLength} />
                      <span>Be at least 8 characters long</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={!!hasCapitalLetter} />
                      <span>Include at least one uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={!!hasLowerCaseLetter} />
                      <span>Include at least one lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={!!hasNumber} />
                      <span>Include at least one number</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
                >
                  Reset Password
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
