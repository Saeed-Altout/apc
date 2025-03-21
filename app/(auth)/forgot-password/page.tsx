"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

// Define Zod schema for forgot password form validation
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .describe("Email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      // Simulating API call to send password reset instructions
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, a unique token would be generated server-side
      // and the reset link would include both the email and this token
      console.log("Password reset requested for:", data.email);

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            Reset Admin Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive password reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className="bg-green-50 border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-semibold">
                Reset Instructions Sent
              </AlertTitle>
              <AlertDescription className="text-green-700">
                We've sent password reset instructions to {submittedEmail}.
                Please check your inbox and click on the reset password link to
                continue.
                {/* This is for demonstration purposes only - in a real app, this link would be sent via email */}
                <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded-md">
                  <p className="text-xs text-green-800 mb-2">
                    Demo: Click the link below to simulate clicking the link
                    from email:
                  </p>
                  <Link
                    href={`/new-password?email=${encodeURIComponent(
                      submittedEmail
                    )}&token=${encodeURIComponent(
                      "demo-reset-token-" + Date.now()
                    )}`}
                    className="text-xs text-blue-600 underline"
                  >
                    Reset password for {submittedEmail}
                  </Link>
                </div>
              </AlertDescription>
              <Button
                onClick={() => router.push("/login")}
                className="mt-4 w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
              >
                Return to Login
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@email.com"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
                >
                  Send Reset Link {isLoading && <Spinner variant="circle" />}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        {!isSubmitted && (
          <CardFooter className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-[#0f766d] hover:underline"
            >
              Back to Login
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
