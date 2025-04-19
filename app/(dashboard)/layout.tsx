import type { Metadata } from "next";
import { seoConfig } from "@/config";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BlockUserModal } from "./(routes)/users/_components/block-user-modal";
import { DeleteUserModal } from "./(routes)/users/_components/delete-user-modal";
import { LogoutModal } from "../auth/_components/logout-modal";
import { BlockUsersModal } from "./(routes)/users/_components/block-users-modal";
import { DeleteUsersModal } from "./(routes)/users/_components/delete-users-modal";
import { ProtectedRoutes } from "@/guards/protected-routes";

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.description,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoutes>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-hidden">
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 border-b px-4 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end mr-2">
                <span className="text-sm font-medium">Hozan</span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
              <Avatar>
                <AvatarImage src="/avatar.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-4">
            {children}
            <DeleteUserModal />
            <DeleteUsersModal />
            <BlockUsersModal />
            <BlockUserModal />
            <LogoutModal />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoutes>
  );
}
