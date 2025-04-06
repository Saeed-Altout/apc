"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StorageService } from "@/services/token/storage-service";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = ["/login", "/forgot-password", "/new-password"];

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      // Avoid auth check for public pages
      if (PUBLIC_PATHS.some((path) => pathname.includes(path))) {
        setIsLoading(false);
        return;
      }

      const isAuth = StorageService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (!isAuth) {
        router.push("/login");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If on a protected route and not authenticated, the useEffect will redirect to login
  // If on a public route or authenticated, render the children
  return isAuthenticated ||
    PUBLIC_PATHS.some((path) => pathname.includes(path)) ? (
    <>{children}</>
  ) : null;
};

export default ProtectedRoute;
