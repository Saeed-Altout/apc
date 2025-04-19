"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/services/auth/auth-service";
import { AUTH_LOGIN_REDIRECT } from "@/config/constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

// Define public paths that don't need authentication
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/new-password",
];

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Skip auth check for public paths
      if (PUBLIC_PATHS.some((path) => pathname.includes(path))) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const isLoggedIn = AuthService.isAuthenticated();
      setIsAuthenticated(isLoggedIn);

      if (!isLoggedIn) {
        router.push(AUTH_LOGIN_REDIRECT);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, render nothing (redirect will happen in useEffect)
  return null;
};
