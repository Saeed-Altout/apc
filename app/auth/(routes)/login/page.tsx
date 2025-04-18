"use client";
import * as React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import { Eye, EyeOff } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { OTPlessScript } from "../../_components/otp-less-script";
import { useLogin } from "@/services/auth/auth-hook";

const loginFormSchema = z.object({
  email: z.string().describe("Email"),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .describe("Phone number"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .describe("Password"),
  rememberMe: z.boolean().default(false).describe("Remember Me"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const [isWhatsappLogin, setIsWhatsappLogin] = React.useState<boolean>(false);
  const [isPassword, setIsPassword] = React.useState<"password" | "text">(
    "password"
  );
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      rememberMe: false,
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login({
      phoneNumber: values.phoneNumber || null,
      email: values.email || null,
      password: values.password,
    });
  };

  React.useEffect(() => {
    if (isWhatsappLogin) {
      router.refresh();
    }
  }, [isWhatsappLogin]);

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

      {isWhatsappLogin && <OTPlessScript />}
      <WrapperCard
        title={isWhatsappLogin ? "Whatsapp Login" : "Admin Login"}
        description={
          isWhatsappLogin
            ? "Enter your phone number to continue."
            : "Enter your credentials to continue."
        }
        onClick={() => setIsWhatsappLogin(true)}
        whatsappProvider={!isWhatsappLogin}
      >
        {isWhatsappLogin ? (
          <div id="otpless-login-page"></div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="phoneNumber" className="space-y-2">
                <TabsList className="w-full flex items-center justify-center">
                  <TabsTrigger className="w-1/2" value="phoneNumber">
                    Phone Number
                  </TabsTrigger>
                  <TabsTrigger className="w-1/2" value="email" disabled>
                    Email
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="phoneNumber">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            className="react-international-phone-input-container"
                            defaultCountry="ae"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="email">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            disabled={isPending}
                            className="mb-2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPassword}
                          disabled={isPending}
                          className="pr-12"
                          placeholder="*******"
                          {...field}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          type="button"
                          className="absolute top-1/2 -translate-y-1/2 right-2"
                          onClick={() =>
                            setIsPassword((prev) =>
                              prev === "password" ? "text" : "password"
                            )
                          }
                        >
                          {isPassword === "password" && <Eye />}
                          {isPassword === "text" && <EyeOff />}
                        </Button>
                      </div>
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
                disabled={isPending}
                className="w-full bg-[#0f766d] hover:bg-[#0f766d]/90 text-white"
              >
                Log in {isPending && <Spinner variant="circle" />}
              </Button>
            </form>
          </Form>
        )}
      </WrapperCard>
    </div>
  );
}
