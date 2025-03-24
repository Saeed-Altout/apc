"use client";
import * as React from "react";

import { useAuthStore } from "@/services/auth/auth-store";
import { UserRole } from "@/config/enums";
import { useRouter } from "next/navigation";

interface ProtectedRoutesProps {
  role: UserRole;
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ role, children }: ProtectedRoutesProps) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const { accessToken } = useAuthStore();
  const router = useRouter();

  if (role === UserRole.GUEST && accessToken) {
    router.push("/");
    return null;
  }

  if (role === UserRole.ADMIN && !accessToken) {
    router.push("/login");
    return null;
  }

  if (role !== UserRole.ADMIN && role !== UserRole.GUEST) {
    router.push("/not-allow");
    return null;
  }

  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted ? children : null;
};
