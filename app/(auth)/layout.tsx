import { Metadata } from "next";
import { ProtectedRoutes } from "@/guard/protected-routes";
import { UserRole } from "@/config/enums";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Authentication",
  description: "APC Prime administrative access",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ProtectedRoutes role={UserRole.GUEST}>
      <div className="min-h-screen bg-white flex flex-col">
        <div className="fixed bottom-0 w-full">
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <path
              d="M0,0 C300,150 750,150 1000,0 L1000,200 L0,200 Z"
              className="fill-[#0f766d]"
            />
          </svg>
        </div>

        <div className="absolute top-4 left-4 px-3 py-1 bg-[#0f766d] text-white text-xs font-semibold rounded-full">
          Secure Admin Portal
        </div>

        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-10">
          {children}
        </div>
      </div>
    </ProtectedRoutes>
  );
}
