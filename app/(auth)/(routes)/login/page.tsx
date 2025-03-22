"use client";
import * as React from "react";

import Link from "next/link";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { WrapperCard } from "../../_components/wrapper-card";
import { useRequestSmsTokenMutation } from "@/services/auth/auth-hook";

const loginFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .describe("Phone number"),
  rememberMe: z.boolean().default(false).describe("Remember Me"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { mutateAsync, isPending } = useRequestSmsTokenMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phoneNumber: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    mutateAsync({ phoneNumber: values.phoneNumber });
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

      <WrapperCard
        title="Admin Login"
        description="Enter your credentials to continue."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="09123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                      Remember Me
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Link
                href="/forgot-password"
                className="text-sm text-[#0f766d] hover:underline"
              >
                Forgot your password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
            >
              Log in {isPending && <Spinner variant="circle" />}
            </Button>
          </form>
        </Form>
      </WrapperCard>
    </div>
  );
}
