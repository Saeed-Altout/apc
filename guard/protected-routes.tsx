"use client";
import * as React from "react";

import { useAuthStore } from "@/services/auth/auth-store";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRoutesProps {
  authRequired?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoutes = ({
  authRequired = true,
  children,
}: ProtectedRoutesProps) => {
  // const { accessToken } = useAuthStore();
  // const router = useRouter();

  // if (!accessToken && authRequired) {
  //   router.push("/login");
  // }

  // if (accessToken && !authRequired) {
  //   router.push("/");
  // }

  // // Need to check conditions again as the effect runs after render
  // if ((!authRequired && accessToken) || (authRequired && !accessToken)) {
  //   return null;
  // }

  return children;
};
