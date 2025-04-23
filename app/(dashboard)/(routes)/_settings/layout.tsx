"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrapper } from "@/components/ui/wrapper";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Wrapper
      title="Settings"
      description="Manage system configuration and administration"
    >
      <div>
        <Tabs defaultValue="translation" value={getTabValue(pathname)}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="translation" asChild>
              <Link href="/settings/translation">Translation</Link>
            </TabsTrigger>
            <TabsTrigger value="operations" asChild>
              <Link href="/settings/operations">Operations</Link>
            </TabsTrigger>
            <TabsTrigger value="admins" asChild>
              <Link href="/settings/admins">Admins</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-6" />
      <div>{children}</div>
    </Wrapper>
  );
}

function getTabValue(pathname: string): string {
  if (pathname.includes("/settings/translation")) return "translation";
  if (pathname.includes("/settings/operations")) return "operations";
  if (pathname.includes("/settings/admins")) return "admins";
  return "translation"; // Default tab
}
