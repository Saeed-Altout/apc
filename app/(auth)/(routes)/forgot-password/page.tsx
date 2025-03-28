"use client";
import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-md">
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
          {form.formState.isSubmitted ? (
            <Alert className="bg-green-50 border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-semibold">
                Reset Instructions Sent
              </AlertTitle>
              <AlertDescription className="text-green-700">
                We've sent password reset instructions to{" "}
                {form.getValues("email")}. Please check your inbox and click on
                the reset password link to continue.
                <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded-md">
                  <p className="text-xs text-green-800 mb-2">
                    Demo: Click the link below to simulate clicking the link
                    from email:
                  </p>
                  <Link
                    href={`/new-password?email=${encodeURIComponent(
                      form.getValues("email")
                    )}&token=${encodeURIComponent(
                      "demo-reset-token-" + Date.now()
                    )}`}
                    className="text-xs text-blue-600 underline"
                  >
                    Reset password for {form.getValues("email")}
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
                  className="w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
                >
                  Send Reset Link
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        {!form.formState.isSubmitted && (
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
