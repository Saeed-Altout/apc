"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/services/auth/auth-service";
import { DEFAULT_PATH } from "@/config/constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PublicRoutesProps {
  children: React.ReactNode;
}

// Define auth-only paths that should redirect to dashboard if authenticated
const AUTH_PATHS = ["/login", "/forgot-password", "/new-password"];

export const PublicRoutes: React.FC<PublicRoutesProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Only check auth on explicit auth paths
      if (!AUTH_PATHS.some((path) => pathname.includes(path))) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const isLoggedIn = AuthService.isAuthenticated();
      setIsAuthenticated(isLoggedIn);

      if (isLoggedIn) {
        router.push(DEFAULT_PATH);
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

  // If not authenticated, render children
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, render nothing (redirect will happen in useEffect)
  return null;
};
