import { Metadata } from "next";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Authentication",
  description: "APC Prime administrative access",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Wave background at the bottom */}
      <div className="fixed bottom-0 w-full">
        <svg
          viewBox="0 0 1000 150"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0,0 C300,100 600,100 1000,0 L1000,150 L0,150 Z"
            className="fill-[#0f766d]"
          />
        </svg>
      </div>

      {/* Admin security badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-[#0f766d] text-white text-xs font-semibold rounded-full">
        Secure Admin Portal
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>
    </div>
  );
}
