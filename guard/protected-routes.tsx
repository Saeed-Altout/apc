"use client";
import * as React from "react";

import { useAuthStore } from "@/services/auth/auth-store";
import { useRouter } from "next/navigation";

interface ProtectedRoutesProps {
  authRequired?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoutes = ({
  authRequired = true,
  children,
}: ProtectedRoutesProps) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const { accessToken } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);

    // Handle redirects in useEffect to avoid React hooks errors
    if (!authRequired && accessToken) {
      router.push("/");
    } else if (authRequired && !accessToken) {
      router.push("/login");
    }

    return () => setIsMounted(false);
  }, [authRequired, accessToken, router]);

  // Need to check conditions again as the effect runs after render
  if ((!authRequired && accessToken) || (authRequired && !accessToken)) {
    return null;
  }

  return isMounted ? children : null;
};
